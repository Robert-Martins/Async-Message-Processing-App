import { Component } from '@angular/core';
import { ListComponent } from '../../../molecules/lists/list/list.component';
import { ListsModule } from '../../../molecules/lists/lists.module';
import { NotificacaoService } from '../../../../../core/services/notificacao.service';
import { BehaviorSubject } from 'rxjs';
import { Notificacao } from '../../../../../core/models/notificacao.models';
import { CommonModule } from '@angular/common';
import { ListHeaderComponent } from "../../../atoms/lists/list-header/list-header.component";
import { ListItemComponent } from "../../../atoms/lists/list-item/list-item.component";

@Component({
  selector: 'app-notificacao-list',
  imports: [CommonModule, ListComponent, ListsModule, ListHeaderComponent, ListItemComponent],
  templateUrl: './notificacao-list.component.html',
  styleUrl: './notificacao-list.component.scss'
})
export class NotificacaoListComponent {

  constructor(
    private readonly notificacaoService: NotificacaoService
  ) { }

  public getCurrentNotificacoes$(): BehaviorSubject<Notificacao[]> {
    return this.notificacaoService.getCurrentNotificacoes();
  }

}
