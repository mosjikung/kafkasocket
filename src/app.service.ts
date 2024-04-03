import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka/producer.service';
import { ConsumerService } from './kafka/consumer.service';

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService,
    private readonly consumerService:ConsumerService) {}

  async getHello() {
    //console.log("Can send")
    // await this.consumerService.consume(
    //   { topics: ['topic200'] },
    //   {
    //     eachMessage: async ({ topic, partition, message }) => {
    //       console.log({
    //         value: message.value.toString(),
    //         headers: topic.toString(),
    //         partition: partition.toString(),
    //       });
          
    //     },
    //   },
    // );
    return 'Hello Worldssxxxxxx!!';
  }
}
