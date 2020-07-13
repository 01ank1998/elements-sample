import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalComponent } from './internal/internal.component';
import { Module2Component } from './module2.component';

@NgModule({
  declarations: [InternalComponent, Module2Component],
  imports: [CommonModule],
  exports: [Module2Component],
  entryComponents: [Module2Component],
})
export class Module2Module {
  customElementComponent: Type<any> = Module2Component;
}
