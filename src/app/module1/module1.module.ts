import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalComponent } from './internal/internal.component';
import { Module1Component } from './module1.component';

@NgModule({
  declarations: [InternalComponent, Module1Component],
  imports: [CommonModule],
  exports: [Module1Component],
  entryComponents: [Module1Component],
})
export class Module1Module {
  customElementComponent: Type<any> = Module1Component;
}
