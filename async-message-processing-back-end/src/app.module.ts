import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NotificacaoModule } from './modules/notificacao/notificacao.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './core/config/environment/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    NotificacaoModule
  ],
  controllers: [AppController],
})
export class AppModule {}
