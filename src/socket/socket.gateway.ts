import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: '/socket' })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  // Unirse a un room
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, payload: { room: string }) {
    client.join(payload.room);
    client.emit('joinedRoom', { room: payload.room });
    console.log(`Cliente ${client.id} se unió a la sala ${payload.room}`);
  }

  // Encender la alarma
  @SubscribeMessage('turnOnAlert')
  handleTurnOnAlert(
    @MessageBody() body: { room: string; data: any },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(body.room).emit('alertOn', {
      from: client.id,
      data: body.data,
    });
    console.log(`Alarma ENCENDIDA en sala ${body.room}`);
  }

  // Apagar la alarma
  @SubscribeMessage('turnOffAlert')
  handleTurnOffAlert(
    @MessageBody() body: { room: string; data: any },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(body.room).emit('alertOff', {
      from: client.id,
      data: body.data,
    });
    console.log(`Alarma APAGADA en sala ${body.room}`);
  }
}
