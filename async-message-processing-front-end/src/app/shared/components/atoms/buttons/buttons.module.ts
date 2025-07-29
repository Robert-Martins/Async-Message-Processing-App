import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatButtonDirective } from './flat-button.directive';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlatButtonDirective
  ],
  exports: [
    FlatButtonDirective
  ]
})
export class ButtonsModule { }
