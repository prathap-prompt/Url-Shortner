import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly configservice: ConfigService,

  ) {}

  @Get()
  getHello() {
    return this.appService.getHello()
  }
}
