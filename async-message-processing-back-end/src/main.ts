import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

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

const configApp = (app: INestApplication): void => {
  configAppDocument(app);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configApp(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
