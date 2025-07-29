import { BadRequestException, Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { StatusNotificacao } from "src/core/vo/enums/status-notificacao.enum";

export interface StatusQueueMessage {
    mensagemId: string;
    status: StatusNotificacao;
    timestamp: string;
}

@Injectable()
export class StatusQueuePublisher {

    private readonly logger = new Logger(StatusQueuePublisher.name);

    constructor(
        @Inject('STATUS_QUEUE_SERVICE') private readonly client: ClientProxy
    ) { }

    public async publishStatusUpdate(mensagemId: string, status: StatusNotificacao): Promise<void> {
        const message: StatusQueueMessage = {
            mensagemId,
            status,
            timestamp: new Date().toISOString()
        };

        try {
            this.logger.log(`Publicando atualização de status na fila: ${JSON.stringify(message)}`);
            
            await lastValueFrom(
                this.client.emit('notificacao_status', message)
            );

            this.logger.log(`Status publicado com sucesso - ID: ${mensagemId}, Status: ${status}`);
        } catch (error) {
            this.logger.error(`Erro ao publicar status na fila: ${error.message}`, error.stack);
            throw new BadRequestException(`Erro ao publicar status: ${error.message}`);
        }
    }
}