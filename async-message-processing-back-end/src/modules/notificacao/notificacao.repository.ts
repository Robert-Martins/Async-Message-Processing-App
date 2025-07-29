import { Injectable } from "@nestjs/common";
import { NotificacaoDto } from "./dtos/notificacao.dto";
import { StatusNotificacao } from "src/core/vo/enums/status-notificacao.enum";

export interface INotificacaoRepository {
    findAll(): Promise<NotificacaoDto[]>;
    save(notificacao: NotificacaoDto): Promise<NotificacaoDto>;
    updateStatus(id: string, status: StatusNotificacao): Promise<void>;
    findById(id: string): Promise<NotificacaoDto | undefined>;
}

export const INotificacaoRepositoryToken = Symbol('INotificacaoRepository');

@Injectable()
export class NotificacaoRepository {

    private readonly notificacoes: Map<string, NotificacaoDto> = new Map();

    public async findAll(): Promise<NotificacaoDto[]> {
        return Array.from(this.notificacoes.values());
    }

    public async save(notificacao: NotificacaoDto): Promise<NotificacaoDto> {
        this.notificacoes.set(notificacao.mensagemId, notificacao);
        return notificacao;
    }

    public async updateStatus(id: string, status: StatusNotificacao): Promise<void> {
        const notificacao = this.notificacoes.get(id);
        if (notificacao) {
            notificacao.status = status;
        }
    }

    public async findById(id: string): Promise<NotificacaoDto | undefined> {
        return this.notificacoes.get(id);
    }

}