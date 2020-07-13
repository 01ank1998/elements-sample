import {
  Component,
  ViewChild,
  ViewContainerRef,
  Type,
  ComponentFactoryResolver,
  Injector,
  ReflectiveInjector,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { LazyLoadModuleService } from '../../shared/service/lazy-load-module/lazy-load-module.service';

@Component({
  template: ` <ng-template #container></ng-template> `,
  styleUrls: [],
})
export class Module1WrapperComponent implements OnInit, OnDestroy {
  @ViewChild('container', { read: ViewContainerRef }) container;

  componentRef;
  componentToLoad: Type<any>;
  componentFactoryResolver: ComponentFactoryResolver;
  injector: Injector;

  constructor(
    private lazyLoadModuleService: LazyLoadModuleService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.lazyLoadModuleService
      .getComponentToLoad('module-one')
      .subscribe((event) => {
        this.componentToLoad = event.componentClass;
        this.componentFactoryResolver = this.lazyLoadModuleService.getComponentFactoryResolver(
          this.componentToLoad
        );
        this.injector = this.lazyLoadModuleService.getInjector(
          this.componentToLoad
        );
        const attributes = this.getElementAttributes();
        this.createComponent(attributes);
      });
  }

  createComponent(attributes) {
    this.container.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      this.componentToLoad
    );
    this.componentRef = this.container.createComponent(
      factory,
      0,
      this.injector
    );

    this.setAttributes(attributes);
    this.listenToAttributeChanges();
  }

  setAttributes(attributes) {
    attributes.forEach((attr) => {
      this.componentRef.instance[attr.name] = attr.value;
    });
  }

  getElementAttributes() {
    const attributes = [];

    return attributes;
  }

  listenToAttributeChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          const attributes = this.getElementAttributes();
          this.setAttributes(attributes);
        }
      });
    });

    observer.observe(this.elementRef.nativeElement, {
      attributes: true,
    });
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
