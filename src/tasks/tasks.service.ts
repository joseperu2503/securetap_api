import { Injectable, Logger } from '@nestjs/common';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private socketGateway: SocketGateway) {}

  // // 👇 se ejecuta cada minuto
  // @Cron('* * * * *')
  // handleCron() {
  //   this.logger.log('⏰ Cron ejecutado');

  //   const now = new Date();
  //   const hours = now.getHours();
  //   const minutes = now.getMinutes();

  //   this.initAlert();

  //   // Validar: entre 00:30 y 06:00 cada 30 min
  //   const isNight = hours >= 0 && hours < 6;
  //   const isHalfHour = minutes === 0 || minutes === 30;

  //   if (isNight && isHalfHour) {
  //     this.logger.log(
  //       `⏰ Ejecutando tarea programada a las ${now.toLocaleTimeString()}`,
  //     );

  //     this.initAlert();
  //     // 👉 aquí pones tu lógica (ej: emitir socket, disparar alarma, etc.)
  //   }
  // }

  initAlert() {
    // this.socketGateway.server.to('alertas').emit('alertOn', {
    //   from: 'cron',
    //   message: '🚨 Alarma encendida',
    // });

    // setTimeout(() => {
    //   this.socketGateway.server.to('alertas').emit('alertOff', {
    //     from: 'cron',
    //     message: '✅ Alarma apagada',
    //   });
    // }, 5000);
  }
}
