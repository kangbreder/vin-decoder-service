import { HttpModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VinDecoderService } from './vin-decoder/vin-decoder.service';
import { VinDecoderController } from './vin-decoder/vin-decoder.controller';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [HttpModule],
  controllers: [AppController, VinDecoderController],
  providers: [AppService, VinDecoderService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
