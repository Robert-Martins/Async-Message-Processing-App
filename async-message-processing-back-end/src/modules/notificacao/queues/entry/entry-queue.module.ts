import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { provideQueueConfiguration } from "src/core/config/queues/queue.config";
import { EntryQueuePublisher } from "./entry-queue.publisher";
import { EntryQueueConsumer } from "./entry-queue.consumer";
import { INotificacaoRepositoryToken, NotificacaoRepository } from "../../notificacao.repository";
import { StatusQueueModule } from "../status/status-queue.module";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'ENTRY_QUEUE_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => 
                    provideQueueConfiguration('entrada', configService)
            },
        ]),
        StatusQueueModule
    ],
    providers: [
        EntryQueuePublisher, 
        EntryQueueConsumer,
        {
            provide: INotificacaoRepositoryToken,
            useClass: NotificacaoRepository
        }
    ],
    controllers: [EntryQueueConsumer],
    exports: [EntryQueuePublisher, ClientsModule],
})
export class EntryQueueModule {}