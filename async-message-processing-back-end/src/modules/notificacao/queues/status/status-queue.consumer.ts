import { Controller, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { StatusQueueMessage } from './status-queue.publisher';
import { NotificacaoGateway } from '../../notificacao.gateway';

@Controller()
export class StatusQueueConsumer implements OnModuleInit {

    private readonly logger = new Logger(StatusQueueConsumer.name);

    constructor(
        private readonly notificacaoGateway: NotificacaoGateway
    ) { }

    public onModuleInit() {
        this.logger.log('StatusQueueConsumer inicializado');
    }

    @EventPattern('notificacao_status')
    public async handleStatusUpdate(message: StatusQueueMessage): Promise<void> {
        this.logger.log(`Status recebido da fila: ${JSON.stringify(message)}`);

        try {
            await this.notificacaoGateway.sendStatusUpdate(message);

            this.logger.log(`Status processado e enviado via WebSocket - ID: ${message.mensagemId}, Status: ${message.status}`);
        } catch (error) {
            this.logger.error(`Erro ao processar atualização de status ${message.mensagemId}: ${error.message}`, error.stack);
        }
    }
}