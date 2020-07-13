import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  Type,
} from '@angular/core';
import { Component1Component } from '../../shared/component/component1/component1.component';
import { Service1Service } from '../../shared/service/service1.service';
import { Service2Service } from '../../shared/service/service2.service';

@Component({
  template: ` <p>module2 works!</p>
    <app-internal></app-internal>
    <ng-template #component1></ng-template>
    <ng-template #component2></ng-template>`,
})
export class Module2Component implements OnInit {
  @ViewChild('component1', { read: ViewContainerRef })
  component1: ViewContainerRef;
  @ViewChild('component2', { read: ViewContainerRef })
  component2: ViewContainerRef;
  componentRef: ComponentRef<Component1Component>;
  constructor(
    private resolver: ComponentFactoryResolver,
    private service1: Service1Service,
    private service2: Service2Service
  ) {}

  ngOnInit(): void {
    this.loadComponent1();
    this.loadComponent2();
  }

  async loadComponent1(): Promise<any> {
    const { Component1Component } = await import(
      `../../shared/component/component1/component1.component`
    );
    const factory = this.resolver.resolveComponentFactory(Component1Component);
    this.componentRef = this.component1.createComponent(factory);
  }

  async loadComponent2(): Promise<any> {
    const { Component2Component } = await import(
      `../../shared/component/component2/component2.component`
    );
    const factory = this.resolver.resolveComponentFactory(Component2Component);
    this.componentRef = this.component1.createComponent(factory);
  }
}
