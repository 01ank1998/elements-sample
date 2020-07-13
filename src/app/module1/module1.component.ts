import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { Component1Component } from '../../shared/component/component1/component1.component';
import { Service2Service } from 'src/shared/service/service2.service';

@Component({
  template: `<p>Module 1 works</p>
    <app-internal></app-internal>
    <ng-template #component1></ng-template>`,
})
export class Module1Component implements OnInit {
  @ViewChild('component1', { read: ViewContainerRef })
  component1: ViewContainerRef;
  componentRef: ComponentRef<Component1Component>;
  constructor(
    private resolver: ComponentFactoryResolver,
    private service2: Service2Service
  ) {}

  ngOnInit(): void {
    this.loadComponent1();
  }

  async loadComponent1() {
    const { Component1Component } = await import(
      `../../shared/component/component1/component1.component`
    );
    const factory = this.resolver.resolveComponentFactory(Component1Component);
    this.componentRef = this.component1.createComponent(factory);
  }
}
