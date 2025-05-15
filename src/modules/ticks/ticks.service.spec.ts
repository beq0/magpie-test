import { Test, TestingModule } from '@nestjs/testing';
import { TicksService } from './ticks.service';

describe('TicksService', () => {
  let service: TicksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicksService],
    }).compile();

    service = module.get<TicksService>(TicksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
