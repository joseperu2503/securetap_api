import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { SocketModule } from './socket/socket.module';

@Module({
  controllers: [AppController],
  imports: [ConfigModule.forRoot(), EventEmitterModule.forRoot(), SocketModule],
  providers: [],
})
export class AppModule {}
