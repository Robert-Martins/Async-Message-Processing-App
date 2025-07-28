import { Inject, Injectable } from "@nestjs/common";
import { INotificacaoRepository, INotificacaoRepositoryToken } from "./notificacao.repository";
import { NotificacaoDto } from "./dtos/notificacao.dto";
import { StatusNotificacao } from "src/core/vo/enums/status-notificacao.enum";

@Injectable()
export class NotificacaoService {
    
    constructor(
        @Inject(INotificacaoRepositoryToken) private readonly notificacaoRepository: INotificacaoRepository
    ) { }

    public async save(notificacao: NotificacaoDto): Promise<NotificacaoDto> {
        notificacao.status = StatusNotificacao.AGUARDANDO_PROCESSAMENTO;
        return this.notificacaoRepository.save(notificacao);
    }

    public async findAll(): Promise<NotificacaoDto[]> {
        return this.notificacaoRepository.findAll();
    }

}