import { Test, TestingModule } from '@nestjs/testing';
import { VinDecoderService } from './vin-decoder.service';

describe('VinDecoderService', () => {
  let service: VinDecoderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VinDecoderService],
    }).compile();

    service = module.get<VinDecoderService>(VinDecoderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
