import { Test, TestingModule } from '@nestjs/testing';
import { VinDecoderController } from './vin-decoder.controller';

describe('VinDecoderController', () => {
  let controller: VinDecoderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VinDecoderController],
    }).compile();

    controller = module.get<VinDecoderController>(VinDecoderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
