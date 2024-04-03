import { Controller, Get, Post, Body, Patch, Param, Delete, OnModuleInit } from '@nestjs/common';
import { NotiserviceService } from './notiservice.service';
import { CreateNotiserviceDto } from './dto/create-notiservice.dto';
import { UpdateNotiserviceDto } from './dto/update-notiservice.dto';
import { ProducerService } from 'src/kafka/producer.service';
import { ConsumerService } from 'src/kafka/consumer.service';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketGateway } from '../socket/socket.gatway';
import { json } from 'stream/consumers';




@Controller('notiservice')
export class NotiserviceController{
  
  constructor(private readonly notiserviceService: NotiserviceService,
    private readonly producerService: ProducerService,
    private readonly socketGateway:SocketGateway,
    private readonly consumerService: ConsumerService) {}

  

  @Post()
  async sendNotiUser(@Body('user_id') userId: number, @Body('username') username: string, @Body('type') type: string): Promise<string> {
    const results = this.notiserviceService.sendNotiUser(userId,username,type)
    return `User ${username} with ID ${userId} created successfully.`;
  }

  @Post("/send-data")
  async sendNotiOne(@Body('user_id') userId: number, @Body('username') username: string, @Body('type') type: string): Promise<string> {
    const results = this.notiserviceService.sendNotiOne(userId,username,type)
    return `User ${username} with ID ${userId} created successfully.`;
  }

  

  // @Get()
  // findAll() {
  //   return this.notiserviceService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.notiserviceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNotiserviceDto: UpdateNotiserviceDto) {
  //   return this.notiserviceService.update(+id, updateNotiserviceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.notiserviceService.remove(+id);
  // }
}
