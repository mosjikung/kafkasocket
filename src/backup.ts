// socket.gateway.ts

import { OnModuleInit } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server,Socket } from 'socket.io';

interface RegisMessage {
  user_id: string;
  username: string;
  status:string;
}

@WebSocketGateway({
  cors:{
    origin: ['http://localhost:3000'],
  },
})

export class SocketGateway implements OnGatewayConnection,OnGatewayDisconnect,OnModuleInit{  

  @WebSocketServer()
  server: Server;

  private clients: Map<string, string> = new Map(); // Map userId to socketId

  onModuleInit() {
    this.server.on('connection', (socket) =>{
      console.log(socket.id);
      console.log('connected');
    });
}

  // handleConnection(client: Socket, ...args: any[]) {
  //   let userId = client.handshake.query.userId;
  
  //   // ตรวจสอบว่า userId มีค่าและไม่ใช่ string ว่าง
  //   if (userId) {
  //     // ถ้า userId เป็น array, เลือกค่าแรก (หรือจัดการตามความต้องการ)
  //     if (Array.isArray(userId)) {
  //       userId = userId[0];
  //     }
  
  //     // ตรวจสอบอีกครั้งหลังจากการปรับค่า หากเป็น array
  //     if (userId && userId.trim() !== '') {
  //       console.log(`User ID is: ${userId}`);
  //       // ทำงานต่อไปด้วย userId
  //     } else {
  //       console.error('User ID is empty or not valid.');
  //     }
  //   } else {
  //     console.error('No User ID provided.');
  //   }
  // }
  sendMessageToUser(userId: string, message: any) {
    const socketId = this.clients.get(userId);
    if (socketId) {
      this.server.to(socketId).emit('message', message);
    }
  }
  
  

  @SubscribeMessage('sendToUser')
  handleMessage(client: any, payload: any): void {
    const { userId, message } = payload;
    this.server.to(userId).emit('messageToUser', message);
  }

  // @SubscribeMessage('newMessage')
  // onNewMessage(@MessageBody() body: any){
  //   console.log(body);
  //   this.server.emit('onMessage', {
  //     msg: 'Oh my God',
  //     content: body,
  //   });
  // }

  
//   @SubscribeMessage('newUsername')
//   onAnotherMessage(body: RegisMessage) {
//   // แสดงข้อมูลใน console
  
//   const { user_id, username, status } = body;
//   console.log(body)
//   this.server.emit('onAnotherMessage', {
//     msg: 'New Usersname',
//     content: {
//       user: user_id,
//       username: username,
//       type: status,
//     },
//   });
// }



//     // ดำเนินการอื่น ๆ ตามที่ต้องการ
//   } else {
//     setTimeout(() => {
//       this.handleJoinRoom(client, data);
//     }, 1000);
//   }
  
  
// }

// @SubscribeMessage('events')
//   handleMessage(client: Socket, @MessageBody() data: any): void {
//     console.log(`Received data from client ${client.id}:`, data);
//   }
 

  handleConnection(client: any, ...args: any[]) {
    // ทำตราบเท่ากับการเชื่อมต่อ
    this.server.emit('events', 'Client connected');
  }

  handleDisconnect(client: Socket) {
    this.clients.forEach((value, key) => {
      if (value === client.id) {
        this.clients.delete(key);
      }
    });
  }
}
