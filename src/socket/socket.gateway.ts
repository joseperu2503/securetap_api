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
    console.log(
      `Cliente conectado: ${client.id} | ${new Date().toLocaleString('es-PE', {
        timeZone: 'America/Lima',
      })}`,
    );
  }

  handleDisconnect(client: Socket) {
    console.log(
      `Cliente desconectado: ${client.id} | ${new Date().toLocaleString(
        'es-PE',
        {
          timeZone: 'America/Lima',
        },
      )}}`,
    );
  }

  // Unirse a un room
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { room: string; data: any },
  ) {
    client.join(body.room);
    client.emit('joinedRoom', { room: body.room });

    console.log(
      `Cliente ${client.id} (${body.data?.name}) se unió a la sala ${body.room}`,
    );
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
    console.log(
      `Alarma ENCENDIDA en sala ${body.room} | ${new Date().toLocaleString(
        'es-PE',
        {
          timeZone: 'America/Lima',
        },
      )}}`,
    );
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

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket) {
    client.emit('pong');
  }
}
