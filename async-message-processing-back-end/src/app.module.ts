import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NotificacaoModule } from './modules/notificacao.module';

@Module({
  imports: [NotificacaoModule],
  controllers: [AppController],
})
export class AppModule {}
