import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaComponent } from './text-area/text-area.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TextAreaComponent
  ],
  exports: [
    TextAreaComponent
  ]
})
export class FormsModule { }
