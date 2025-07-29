import { Controller, Inject, Logger, OnModuleInit } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { INotificacaoRepository, INotificacaoRepositoryToken } from '../../notificacao.repository';
import { StatusNotificacao } from 'src/core/vo/enums/status-notificacao.enum';
import { EntryQueueMessage } from './entry-queue.publisher';
import { StatusQueuePublisher } from '../status/status-queue.publisher';

@Controller()
export class EntryQueueConsumer implements OnModuleInit {

    private readonly logger = new Logger(EntryQueueConsumer.name);

    constructor(
        @Inject(INotificacaoRepositoryToken) 
        private readonly notificacaoRepository: INotificacaoRepository,
        private readonly statusQueuePublisher: StatusQueuePublisher
    ) { }

    public onModuleInit() {
        this.logger.log('EntryQueueConsumer inicializado');
    }

    @EventPattern('notificacao_entrada')
    public async handleEntryMessage(message: EntryQueueMessage): Promise<void> {
        this.logger.log(`Mensagem recebida da fila: ${JSON.stringify(message)}`);

        try {
            await this.simulateAsyncProcessing();

            const isSuccess = this.wasSuccessful();
            
            this.logger.log(`${isSuccess ? "Processamento bem-sucedido" : "Falha no processamento"} - ID: ${message.mensagemId}`);
            await this.defineAndUpdateNotificationStatus(message.mensagemId, isSuccess);

        } catch (error) {
            this.logger.error(`Erro durante o processamento da mensagem ${message.mensagemId}: ${error.message}`, error.stack);
            await this.defineAndUpdateNotificationStatus(message.mensagemId);
        }
    }

    private async defineAndUpdateNotificationStatus(
        mensagemId: string,
        wasSuccessful: boolean = false
    ): Promise<void> {
        const status = wasSuccessful 
            ? StatusNotificacao.PROCESSADO_SUCESSO 
            : StatusNotificacao.FALHA_PROCESSAMENTO;

        await this.notificacaoRepository.updateStatus(mensagemId, status);

        await this.statusQueuePublisher.publishStatusUpdate(mensagemId, status);

        this.logger.log(`Status da notificação ${mensagemId} atualizado para ${status}`);
    }

    private wasSuccessful(): boolean {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        return randomNumber > 2;
    }

    private async simulateAsyncProcessing(): Promise<void> {
        const delay = 1000 + Math.random() * 1000;
        return new Promise(resolve => setTimeout(resolve, delay));
    }
}