import { Controller, Get, Param, Query } from '@nestjs/common';
import { VinDecoderService } from './vin-decoder.service';

@Controller('vin-decoder')
export class VinDecoderController {
  constructor(private readonly vinDecoderService: VinDecoderService) {}

  @Get(':vin')
  findOne(@Param('vin') vin, @Query('nhtsa') nhtsa): string {
    if (nhtsa) {
      return this.vinDecoderService.nhtsaDecode(vin);
    } else {
      return this.vinDecoderService.decode(vin);
    }
  }
}
