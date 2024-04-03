import { Injectable, OnApplicationShutdown, OnModuleDestroy } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown{
  private readonly kafka = new Kafka({
    clientId: 'kafkajs',
    brokers: ['192.168.100.205:9092'],
    });

  private readonly consumers: Consumer[] = [];

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    try {
      const consumer1 = this.kafka.consumer({ groupId: 'group200' });
      await consumer1.connect();

      await consumer1.subscribe(topic);

      await consumer1.run(config);

      this.consumers.push(consumer1);
    } catch (error) {
      // Handle the error here, you can log it or handle it in any appropriate way
      console.error('An error occurred while consuming:', error);
    }
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
