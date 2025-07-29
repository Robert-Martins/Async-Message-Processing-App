import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ExceptionFilter, INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer, ValidationError } from 'class-validator';
import { AllExceptionsFilter } from './core/config/exceptions/all-exceptions.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { provideQueueConfiguration, provideQueueMicroserviceConfiguration } from './core/config/queues/queue.config';

const extractErrorMessages = (errors: ValidationError[]): string[] => {
  const messages: string[] = [];

  errors.forEach((error) => {
    if (error.constraints) {
      messages.push(...Object.values(error.constraints));
    }
    if (error.children && error.children.length > 0) {
      messages.push(...extractErrorMessages(error.children));
    }
  });

  return messages;
};

const configAppDocument = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('Async Message Processing API')
    .setDescription('Back-End for Async Message Processing Platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
};

const configAppPipes = (): ValidationPipe[] => {
  return [
    new ValidationPipe({
      transform: true,
      exceptionFactory: async (errors: ValidationError[]) => {
        const errorMessages = extractErrorMessages(errors);
        return new BadRequestException(errorMessages.toString());
      },
    }),
  ];
};

const configAppFilters = (app: INestApplication): ExceptionFilter[] => {
  return [new AllExceptionsFilter(app.get(HttpAdapterHost))];
};

const configApp = (app: INestApplication): void => {
  app.useGlobalPipes(...configAppPipes());
  app.useGlobalFilters(...configAppFilters(app));
  configAppDocument(app);
  startAllMicroservices(app);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
};

const startAllMicroservices = async (app: INestApplication): Promise<void> => {
  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>(
    await provideQueueMicroserviceConfiguration('entrada', configService)
  );

  app.connectMicroservice<MicroserviceOptions>(
    await provideQueueMicroserviceConfiguration('status', configService)
  );

  await app.startAllMicroservices();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configApp(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
