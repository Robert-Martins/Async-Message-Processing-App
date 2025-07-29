import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environments';
import { Notificacao } from '../models/notificacao.models';
import { StatusNotificacao } from '../enums/status-notificacao.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  private readonly apiUrl = `${environment.apiUrl}/notificacoes`;
  private readonly notificacoesSubject = new BehaviorSubject<Notificacao[]>([]);

  public readonly notificacoes$ = this.notificacoesSubject.asObservable();

  constructor(private readonly http: HttpClient) {
    this.initializeService();
  }

  private initializeService(): void {
    this.loadNotificacoes().subscribe({
      next: (notificacoes) => {
        console.log('Notificações carregadas na inicialização:', notificacoes);
      },
      error: (error) => {
        console.error('Erro ao carregar notificações na inicialização:', error);
      }
    });
  }

  public getCurrentNotificacoes(): BehaviorSubject<Notificacao[]> {
    return this.notificacoesSubject;
  }

  public getCurrentNotificacoesValue(): Notificacao[] {
    return this.notificacoesSubject.value;
  }

  public loadNotificacoes(): Observable<Notificacao[]> {
    console.log('Carregando notificações do servidor...', this.apiUrl);
    return this.http.get<Notificacao[]>(this.apiUrl).pipe(
      tap(notificacoes => {
        console.log('Notificações recebidas do servidor:', notificacoes);
        this.notificacoesSubject.next(notificacoes);
      })
    );
  }

  public create(notificacao: Omit<Notificacao, 'status'>): Observable<Notificacao> {
    return this.http.post<Notificacao>(this.apiUrl, notificacao).pipe(
      tap(novaNotificacao => {
        console.log('Nova notificação criada:', novaNotificacao);
        const notificacoesAtuais = this.notificacoesSubject.value;
        this.notificacoesSubject.next([...notificacoesAtuais, novaNotificacao]);
      })
    );
  }

  public updateNotificacaoStatus(mensagemId: string, status: keyof typeof StatusNotificacao): void {
    const notificacoesAtuais = this.notificacoesSubject.value;
    const notificacaoIndex = notificacoesAtuais.findIndex(n => n.mensagemId === mensagemId);
    
    if (notificacaoIndex !== -1) {
      const notificacoesAtualizadas = [...notificacoesAtuais];
      notificacoesAtualizadas[notificacaoIndex] = {
        ...notificacoesAtualizadas[notificacaoIndex],
        status: status
      };
      this.notificacoesSubject.next(notificacoesAtualizadas);
      console.log(`Status da notificação ${mensagemId} atualizado para ${status}`);
    } else {
      console.warn(`Notificação com ID ${mensagemId} não encontrada para atualização de status`);
    }
  }

}
