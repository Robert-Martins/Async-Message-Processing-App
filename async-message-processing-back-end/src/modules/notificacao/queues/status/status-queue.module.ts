import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { provideQueueConfiguration } from "src/core/config/queues/queue.config";
import { StatusQueuePublisher } from "./status-queue.publisher";
import { StatusQueueConsumer } from "./status-queue.consumer";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'RABBITMQ_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => 
                    provideQueueConfiguration('status', configService)
            },
        ]),
    ],
    providers: [StatusQueuePublisher, StatusQueueConsumer],
    exports: [StatusQueuePublisher, StatusQueueConsumer, ClientsModule],
})
export class StatusQueueModule {}