import { BadRequestException, Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

export interface EntryQueueMessage {
    mensagemId: string;
    conteudoMensagem: string;
}

@Injectable()
export class EntryQueuePublisher {

    private readonly logger = new Logger(EntryQueuePublisher.name);

    constructor(
        @Inject('ENTRY_QUEUE_SERVICE') private readonly client: ClientProxy
    ) { }

    public async publishMessage(mensagemId: string, conteudoMensagem: string): Promise<void> {
        const message: EntryQueueMessage = {
            mensagemId,
            conteudoMensagem
        };

        try {
            this.logger.log(`Publicando mensagem na fila: ${JSON.stringify(message)}`);
            
            await lastValueFrom(
                this.client.emit('notificacao_entrada', message)
            );

            this.logger.log(`Mensagem publicada com sucesso - ID: ${mensagemId}`);
        } catch (error) {
            this.logger.error(`Erro ao publicar mensagem na fila: ${error.message}`, error.stack);
            throw new BadRequestException(`Erro ao publicar mensagem: ${error.message}`);
        }
    }
}