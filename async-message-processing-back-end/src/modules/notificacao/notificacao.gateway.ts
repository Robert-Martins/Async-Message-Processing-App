import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { StatusQueueMessage } from './queues/status/status-queue.publisher';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/notificacoes'
})
export class NotificacaoGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificacaoGateway.name);
  private connectedClients = new Map<string, Socket>();

  public handleConnection(client: Socket): void {
    this.logger.log(`Cliente conectado: ${client.id}`);
    this.connectedClients.set(client.id, client);
    
    client.emit('connection-established', {
      message: 'Conectado ao sistema de notificações',
      clientId: client.id,
      timestamp: new Date().toISOString()
    });
  }

  public handleDisconnect(client: Socket): void {
    this.logger.log(`Cliente desconectado: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('subscribe-to-message')
  public handleSubscribeToMessage(
    @MessageBody() data: { mensagemId: string },
    @ConnectedSocket() client: Socket,
  ): void {
    this.logger.log(`Cliente ${client.id} se inscreveu para receber atualizações da mensagem: ${data.mensagemId}`);
    
    client.join(`message-${data.mensagemId}`);
    
    client.emit('subscription-confirmed', {
      mensagemId: data.mensagemId,
      message: `Inscrito para receber atualizações da mensagem ${data.mensagemId}`,
      timestamp: new Date().toISOString()
    });
  }

  @SubscribeMessage('unsubscribe-from-message')
  public handleUnsubscribeFromMessage(
    @MessageBody() data: { mensagemId: string },
    @ConnectedSocket() client: Socket,
  ): void {
    this.logger.log(`Cliente ${client.id} cancelou inscrição da mensagem: ${data.mensagemId}`);
    
    client.leave(`message-${data.mensagemId}`);
    
    client.emit('unsubscription-confirmed', {
      mensagemId: data.mensagemId,
      message: `Inscrição cancelada para mensagem ${data.mensagemId}`,
      timestamp: new Date().toISOString()
    });
  }

  public async sendStatusUpdate(statusMessage: StatusQueueMessage): Promise<void> {
    try {
      this.server.to(`message-${statusMessage.mensagemId}`).emit('status-update', {
        mensagemId: statusMessage.mensagemId,
        status: statusMessage.status,
        timestamp: statusMessage.timestamp,
        message: `Status da mensagem ${statusMessage.mensagemId} atualizado para: ${statusMessage.status}`
      });

      this.server.emit('global-status-update', {
        mensagemId: statusMessage.mensagemId,
        status: statusMessage.status,
        timestamp: statusMessage.timestamp
      });

      this.logger.log(`Atualização de status enviada via WebSocket para mensagem ${statusMessage.mensagemId}`);
    } catch (error) {
      this.logger.error(`Erro ao enviar atualização via WebSocket: ${error.message}`, error.stack);
    }
  }

  public async sendCustomNotification(clientId: string, notification: any): Promise<void> {
    const client = this.connectedClients.get(clientId);
    if (client) {
      client.emit('custom-notification', notification);
      this.logger.log(`Notificação personalizada enviada para cliente ${clientId}`);
    } else {
      this.logger.warn(`Cliente ${clientId} não encontrado para envio de notificação`);
    }
  }

  public getConnectionStats(): { totalConnections: number; connectedClients: string[]; timestamp: string } {
    return {
      totalConnections: this.connectedClients.size,
      connectedClients: Array.from(this.connectedClients.keys()),
      timestamp: new Date().toISOString()
    };
  }
}