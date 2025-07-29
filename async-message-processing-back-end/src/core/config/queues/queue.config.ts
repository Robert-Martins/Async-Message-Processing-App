import { ConfigService } from "@nestjs/config";
import { ClientProvider, MicroserviceOptions, Transport } from "@nestjs/microservices";

export const provideQueueConfiguration = async (
    queueName: string,
  configService: ConfigService,
): Promise<ClientProvider> => ({
    transport: Transport.RMQ,
    options: {
        urls: [`${configService.get<string>('queue.protocol')}://${configService.get<string>('queue.username')}:${configService.get<string>('queue.password')}@${configService.get<string>('queue.url')}`],
        queue: `${configService.get<string>('queue.prefix')}.${queueName}.${configService.get<string>('queue.owner')}`,
        queueOptions: { 
            durable: true,
            exclusive: false,
            autoDelete: false
        },
        socketOptions: {
            heartbeatIntervalInSeconds: 60,
            reconnectTimeInSeconds: 5
        }
    },
});

export const provideQueueMicroserviceConfiguration = async (
    queueName: string,
  configService: ConfigService,
): Promise<MicroserviceOptions> => ({
    transport: Transport.RMQ,
    options: {
        urls: [`${configService.get<string>('queue.protocol')}://${configService.get<string>('queue.username')}:${configService.get<string>('queue.password')}@${configService.get<string>('queue.url')}`],
        queue: `${configService.get<string>('queue.prefix')}.${queueName}.${configService.get<string>('queue.owner')}`,
        queueOptions: { 
            durable: true,
            exclusive: false,
            autoDelete: false
        },
        socketOptions: {
            heartbeatIntervalInSeconds: 60,
            reconnectTimeInSeconds: 5
        }
    },
});