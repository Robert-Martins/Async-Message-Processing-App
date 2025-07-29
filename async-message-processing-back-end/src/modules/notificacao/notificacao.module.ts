import { Module } from "@nestjs/common";
import { NotificacaoController } from "./notificacao.controller";
import { INotificacaoRepositoryToken, NotificacaoRepository } from "./notificacao.repository";
import { NotificacaoService } from "./notificacao.service";
import { EntryQueueModule } from "./queues/entry/entry-queue.module";

@Module({
  imports: [
    EntryQueueModule
  ],
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