import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  postHello(@Body() body): string {
    console.log(body);
    return this.appService.getHello();
  }

  @Put()
  putHello(@Body() body): string {
    console.log(body);
    return this.appService.getHello();
  }
}
