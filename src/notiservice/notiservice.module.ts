import { forwardRef, Module } from '@nestjs/common';
import { NotiserviceService } from './notiservice.service';
import { NotiserviceController } from './notiservice.controller';
import { SocketModule } from 'src/socket/socket.module';
import { HttpModule } from '@nestjs/axios';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [forwardRef(() => KafkaModule), SocketModule, HttpModule],
  controllers: [NotiserviceController],
  providers: [NotiserviceService],
})
export class NotiserviceModule {}
