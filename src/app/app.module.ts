import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  Injector,
  CUSTOM_ELEMENTS_SCHEMA,
  Type,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

import { Module1WrapperComponent } from './module1/module1-wrapper.component';
import { Module2WrapperComponent } from './module2/module2-wrapper.component';
import { isPlatformBrowser } from '@angular/common';
@NgModule({
  declarations: [Module1WrapperComponent, Module2WrapperComponent],
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' })],
  providers: [],
  entryComponents: [Module1WrapperComponent, Module2WrapperComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngDoBootstrap() {
    if (isPlatformBrowser(this.platformId)) {
      const { createCustomElement } = require('@angular/elements');
      this.defineCustomElements(
        createCustomElement,
        'module-one',
        Module1WrapperComponent
      );
      this.defineCustomElements(
        createCustomElement,
        'module-two',
        Module2WrapperComponent
      );
    }
  }

  defineCustomElements(fn: any, name: string, component: Type<any>) {
    if (isPlatformBrowser(this.platformId)) {
      if (!window.customElements.get(name)) {
        window.customElements.define(
          name,
          fn(component, { injector: this.injector })
        );
      }
    }
  }
}
