import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { provideQueueConfiguration } from "src/core/config/queues/queue.config";
import { EntryQueuePublisher } from "./entry-queue.publisher";
import { EntryQueueConsumer } from "./entry-queue.consumer";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'RABBITMQ_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => 
                    provideQueueConfiguration('entrada', configService)
            },
        ]),
    ],
    providers: [EntryQueuePublisher, EntryQueueConsumer],
    exports: [EntryQueuePublisher, EntryQueueConsumer, ClientsModule],
})
export class EntryQueueModule {}