import { Component } from '@angular/core';
import { NotificacaoFormComponent } from './shared/components/organisms/notificacao/notificacao-form/notificacao-form.component';
import { NotificacaoListComponent } from './shared/components/organisms/notificacao/notificacao-list/notificacao-list.component';

@Component({
  selector: 'app-root',
  imports: [NotificacaoFormComponent, NotificacaoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Async Message Processing Front End';
}
