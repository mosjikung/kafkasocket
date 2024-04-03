import { Controller, Get, Query } from '@nestjs/common';
import { SocketGateway } from './socket.gatway';
import { SocketService } from './socket.Service';

@Controller('socket')
export class SocketController {
  constructor(private readonly socketGateway: SocketGateway) {}
 
  @Get()
  async sendMessageToUser(@Query('userId') userId: string, @Query('username') username: string) {
    const client = await this.socketGateway.getClient();
    // ดึง client จาก SocketGateway
    if (client){
      this.socketGateway.sendMessageToUser(client,userId, `User Id is ${userId} Username is ${username}`);
    }else{
      console.log("No Can't send")
    }
    
  }
}
