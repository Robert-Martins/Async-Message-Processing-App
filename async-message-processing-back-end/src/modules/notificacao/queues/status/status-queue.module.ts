import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { provideQueueConfiguration } from "src/core/config/queues/queue.config";
import { StatusQueuePublisher } from "./status-queue.publisher";
import { StatusQueueConsumer } from "./status-queue.consumer";
import { NotificacaoGateway } from "../../notificacao.gateway";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'STATUS_QUEUE_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => 
                    provideQueueConfiguration('status', configService)
            },
        ]),
    ],
    controllers: [StatusQueueConsumer],
    providers: [StatusQueuePublisher, NotificacaoGateway],
    exports: [StatusQueuePublisher, NotificacaoGateway, ClientsModule],
})
export class StatusQueueModule {}