// socket.gateway.ts

import { OnModuleInit } from '@nestjs/common';
import { Client } from '@nestjs/microservices';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server,Socket } from 'socket.io';

interface RegisMessage {
  user_id: string;
  username: string;
  status:string;
}

@WebSocketGateway({
  cors:{
    origin: ['http://localhost:3000','http://localhost:3333'],
  },
})

export class SocketGateway implements OnGatewayConnection,OnGatewayDisconnect{  

  @WebSocketServer()
  server: Server;

  private clientSocket: Socket | null = null;

  private clients: Map<string, string> = new Map<string, string>();


  // onModuleInit() {
  //   this.server.on('connection', (socket) =>{
    
  //   });
  // }

  handleConnection(client: Socket, ...args: any[]) {
    // ตั้งค่า clientSocket เมื่อมีการเชื่อมต่อเข้ามาใหม่
    console.log("handle 2")
    this.clientSocket = client;
    const userId = client.handshake.query?.userId;
  if (typeof userId === 'string') {
    //console.log(`Client ${client.id} authenticated with userId ${userId}`);
    this.clients.set(userId, client.id);
  } else {
    //console.log(`Client ${client.id} connected without userId`);
  }
  }
   getClient(): Socket | null {
    return this.clientSocket; // คืนค่า client ที่มีอยู่ หรือ null หากไม่มี client ที่เชื่อมต่อ
  }

  


  
  // @SubscribeMessage('newMessage')
  // onNewMessage(@MessageBody() body: any){
  //   console.log(body);
  //   this.server.emit('onMessage', {
  //     msg: 'Oh my God',
  //     content: body,
  //   });
  // }

  

  
// }

// @SubscribeMessage('events')
//   handleMessage(client: Socket, @MessageBody() data: any): void {
//     console.log(`Received data from client ${client.id}:`, data);
//   }
 

sendMessageToUser(client: Socket, userId: string, message: any) {
  console.log("message 1")
  //console.log(this.clients)
  const socketId = client.id
  //const socketId_other =  this.clients.get(userId)

  //const socketId = client.handshake.query?.userId;
  console.log(this.clients)
  if (socketId) {
    //console.log(message)
    this.server.to(socketId).emit('recive_message', message);
  }
}

handleDisconnect(client: Socket): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    this.clients.forEach((value, key) => {
      if (value === client.id) {
        this.clients.delete(key);
        console.log('Websocket Disconect');
      }
    });
    resolve(); // แสดงว่าการจัดการเสร็จสมบูรณ์
  });
}
}
