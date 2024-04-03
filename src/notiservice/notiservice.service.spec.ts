import { Test, TestingModule } from '@nestjs/testing';
import { NotiserviceService } from './notiservice.service';

describe('NotiserviceService', () => {
  let service: NotiserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotiserviceService],
    }).compile();

    service = module.get<NotiserviceService>(NotiserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
