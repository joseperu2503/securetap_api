import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { SocketModule } from './socket/socket.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    SocketModule,
    ScheduleModule.forRoot(),
    TasksModule,
  ],
  providers: [],
})
export class AppModule {}
