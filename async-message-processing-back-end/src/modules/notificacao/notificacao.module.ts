import { Module } from "@nestjs/common";
import { NotificacaoController } from "./notificacao.controller";
import { INotificacaoRepositoryToken, NotificacaoRepository } from "./notificacao.repository";
import { NotificacaoService } from "./notificacao.service";

@Module({
  imports: [],
  controllers: [NotificacaoController],
  providers: [
    NotificacaoService,
    {
        provide: INotificacaoRepositoryToken,
        useClass: NotificacaoRepository
    }
  ],
  exports: [NotificacaoService],
})
export class NotificacaoModule {}