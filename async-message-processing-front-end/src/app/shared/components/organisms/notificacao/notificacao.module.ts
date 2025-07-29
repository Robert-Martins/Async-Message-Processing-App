import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacaoFormComponent } from './notificacao-form/notificacao-form.component';
import { NotificacaoListComponent } from './notificacao-list/notificacao-list.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificacaoFormComponent,
    NotificacaoListComponent
  ],
  exports: [
    NotificacaoFormComponent,
    NotificacaoListComponent
  ]
})
export class NotificacaoModule { }
