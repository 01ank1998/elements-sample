import {
  Component,
  ViewChild,
  ViewContainerRef,
  Type,
  ComponentFactoryResolver,
  Injector,
  ReflectiveInjector,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { LazyLoadModuleService } from '../../shared/service/lazy-load-module/lazy-load-module.service';

@Component({
  template: ` <ng-template #container></ng-template> `,
  styleUrls: [],
})
export class Module2WrapperComponent implements OnInit, OnDestroy {
  @ViewChild('container', { read: ViewContainerRef }) container;

  componentRef;
  componentToLoad: Type<any>;
  componentFactoryResolver: ComponentFactoryResolver;
  injector: Injector;

  constructor(private lazyLoadModule: LazyLoadModuleService) {}

  ngOnInit(): void {
    this.lazyLoadModule.getComponentToLoad('module-two').subscribe((event) => {
      this.componentToLoad = event.componentClass;
      this.componentFactoryResolver = this.lazyLoadModule.getComponentFactoryResolver(
        this.componentToLoad
      );
      this.injector = this.lazyLoadModule.getInjector(this.componentToLoad);
      this.createComponent();
    });
  }

  createComponent() {
    this.container.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      this.componentToLoad
    );
    this.componentRef = this.container.createComponent(
      factory,
      0,
      this.injector
    );
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
