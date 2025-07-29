import { Component } from '@angular/core';
import { TextAreaComponent } from '../../../atoms/forms/text-area/text-area.component';
import { FlatButtonDirective } from '../../../atoms/buttons/flat-button.directive';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificacaoService } from '../../../../../core/services/notificacao.service';
import { Notificacao } from '../../../../../core/models/notificacao.models';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-notificacao-form',
  imports: [FormsModule, ReactiveFormsModule, TextAreaComponent, FlatButtonDirective],
  templateUrl: './notificacao-form.component.html',
  styleUrl: './notificacao-form.component.scss'
})
export class NotificacaoFormComponent {

  public readonly notificacaoForm: FormGroup = new FormGroup({
    mensagemId: new FormControl(uuidv4()),
    conteudoMensagem: new FormControl('')
  });

  constructor(
    private readonly notificacaoService: NotificacaoService
  ) { }

  public onSubmit(): void {
    if (this.notificacaoForm.valid) {
      const notificacao = this.notificacaoForm.value;
      this.createNotificacao(notificacao as Notificacao);
      this.notificacaoForm.reset();
    } else {
      console.error('Formulário inválido');
    }
  }

  private createNotificacao(notificacao: Notificacao): void {
    this.notificacaoService.create(notificacao)
      .subscribe({
        next: (response) => {
          console.log('Notificação criada com sucesso:', response)
        },
      });
  }

}
