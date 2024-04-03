import { Test, TestingModule } from '@nestjs/testing';
import { NotiserviceController } from './notiservice.controller';
import { NotiserviceService } from './notiservice.service';

describe('NotiserviceController', () => {
  let controller: NotiserviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotiserviceController],
      providers: [NotiserviceService],
    }).compile();

    controller = module.get<NotiserviceController>(NotiserviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
