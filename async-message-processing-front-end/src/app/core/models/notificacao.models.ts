import { StatusNotificacao } from "../enums/status-notificacao.enum";

export class Notificacao {

    constructor(
        public mensagemId: string,
        public conteudoMensagem: string,
        public status: keyof(StatusNotificacao)
    ) { }

}