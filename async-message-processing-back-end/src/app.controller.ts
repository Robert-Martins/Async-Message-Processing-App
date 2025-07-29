import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App Controller')
@Controller()
export class AppController {

  @Get()
  @HttpCode(HttpStatus.OK)
  public health(): string {
    return 'Async Message Processing Back-End is running!';
  }
}
