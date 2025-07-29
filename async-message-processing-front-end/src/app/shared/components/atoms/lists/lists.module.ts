import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListHeaderComponent } from './list-header/list-header.component';
import { ListItemComponent } from './list-item/list-item.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListHeaderComponent,
    ListItemComponent
  ],
  exports: [
    ListHeaderComponent,
    ListItemComponent
  ]
})
export class ListsModule { }
