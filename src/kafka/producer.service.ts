import {
    Injectable,
    OnApplicationShutdown,
    OnModuleInit,
    OnModuleDestroy
  } from '@nestjs/common';
  import { Kafka, Producer, ProducerRecord } from 'kafkajs';
  
  @Injectable()
  export class ProducerService implements OnModuleInit, OnApplicationShutdown, OnModuleDestroy {
    private readonly kafka = new Kafka({
      clientId: 'kafkajs',
      brokers: ['192.168.100.205:9092'],
      });
  
    private readonly producer: Producer = this.kafka.producer();
  
    async produce(record: ProducerRecord) {
      await this.producer.send(record);
    }
  
    async onModuleInit() {
      await this.producer.connect();
    }
  
    async onApplicationShutdown() {
      await this.producer.disconnect();
    }
    
    async onModuleDestroy() {
      await this.producer.disconnect();
    }
  }
  