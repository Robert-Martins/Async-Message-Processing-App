import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NotificacaoModule } from './modules/notificacao.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './core/config/environment/configuration';

@Module({
  imports: [NotificacaoModule],
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  controllers: [AppController],
})
export class AppModule {}
