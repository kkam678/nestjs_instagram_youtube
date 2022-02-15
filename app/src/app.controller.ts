import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ConfigService} from "@nestjs/config";

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/db-host-from-config')
  getHello(): string {
    console.log(this.configService);
    return this.configService.get('DATABASE_HOST');
  }
}
