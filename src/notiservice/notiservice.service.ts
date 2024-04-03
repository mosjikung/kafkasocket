import { Injectable } from '@nestjs/common';
import { CreateNotiserviceDto } from './dto/create-notiservice.dto';
import { UpdateNotiserviceDto } from './dto/update-notiservice.dto';
import { ProducerService } from 'src/kafka/producer.service';
import { ConsumerService } from 'src/kafka/consumer.service';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketGateway } from '../socket/socket.gatway';
import { json } from 'stream/consumers';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class NotiserviceService {
  constructor(
    private readonly producerService:ProducerService,
    private readonly consumerService:ConsumerService,
    private readonly socketGateway :SocketGateway,
    private readonly httpService : HttpService
  ){}

  

  async sendNotiUser(userId: number, username: string, type: string): Promise<any> {
    const new_date: string = new Date().toISOString();
    const jsonData = {
          'username':username,
          'userid':userId,
          'type':type,
          'date':new_date
    }
    
    const stringChange = JSON.stringify(jsonData)
    
    // สามารถทำต่อไปตามต้องการ, เช่นบันทึกข้อมูลในฐานข้อมูล
    await this.producerService.produce({
      
      topic: 'topic200',
      messages: [
        {
          value:stringChange,
        },
      ],
    });

    
    // await this.consumerService.consume(
    //     { topics: ['topic300'] },
    //     {
          
    //       eachMessage: async ({ topic, partition, message }) => {
    //         console.log({
    //           value: message.value.toString(),
    //           headers: topic.toString(),
    //           partition: partition.toString(),
    //         });
            
    //       },
    //     },
    //   );
      
    const userData = {
      user_id : userId.toString(),
      username : username,
      status : type,
      date: new_date
    }
    
    //this.socketGateway.handleJoinRoom(null, { userData, from: 'backend' });
    

    //this.socketGateway.server.emit('onAnotherMessage', userData);
  }

  async sendNotiOne(userId: number, username: string, type: string): Promise<any> {
    const new_date: string = new Date().toISOString();
    const jsonData = {
          'username':username,
          'userid':userId,
          'type':type,
          'date':new_date
    }
    
    const stringChange = JSON.stringify(jsonData)
    
    // สามารถทำต่อไปตามต้องการ, เช่นบันทึกข้อมูลในฐานข้อมูล
    await this.producerService.produce({
      
      topic: 'topic200',
      messages: [
        {
          value:stringChange,
        },
      ],
    });

    

    const response = await this.httpService.get('http://localhost:5000/notiservice').toPromise();
    if(response.status == 200){
      console.log("Can Send")
    }else{
      console.log("Error")
    }
    
    //this.socketGateway.handleJoinRoom(null, { userData, from: 'backend' });

  }
}
