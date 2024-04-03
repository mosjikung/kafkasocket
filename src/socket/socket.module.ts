// socket.module.ts

import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gatway';
import { SocketController } from './socket.controller';
import { SocketService } from './socket.service';

@Module({
  controllers:[SocketController],
  providers: [SocketGateway,SocketService],
  exports:[SocketGateway]
})
export class SocketModule {}