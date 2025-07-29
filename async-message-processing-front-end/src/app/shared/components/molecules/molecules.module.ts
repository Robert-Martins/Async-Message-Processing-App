import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsModule } from './lists/lists.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListsModule
  ],
  exports: [
    ListsModule
  ]
})
export class MoleculesModule { }
