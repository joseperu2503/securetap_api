import { Module } from '@nestjs/common';
import { SocketModule } from 'src/socket/socket.module';
import { TasksService } from './tasks.service';

@Module({
  providers: [TasksService],
  imports: [SocketModule],
})
export class TasksModule {}
