import { Inject, Injectable } from "@nestjs/common";
import { INotificacaoRepository, INotificacaoRepositoryToken } from "./notificacao.repository";
import { NotificacaoDto } from "./dtos/notificacao.dto";
import { StatusNotificacao } from "src/core/vo/enums/status-notificacao.enum";
import { EntryQueuePublisher } from "./queues/entry/entry-queue.publisher";

@Injectable()
export class NotificacaoService {
    
    constructor(

        @Inject(INotificacaoRepositoryToken) 
        private readonly notificacaoRepository: INotificacaoRepository,
        private readonly entryQueuePublisher: EntryQueuePublisher
    ) { }

    public async save(notificacao: NotificacaoDto): Promise<NotificacaoDto> {
        notificacao.status = StatusNotificacao.AGUARDANDO_PROCESSAMENTO;

        await this.entryQueuePublisher.publishMessage(
            notificacao.mensagemId, 
            notificacao.conteudoMensagem
        );
        
        return this.notificacaoRepository.save(notificacao);
    }

    public async findAll(): Promise<NotificacaoDto[]> {
        return this.notificacaoRepository.findAll();
    }

}