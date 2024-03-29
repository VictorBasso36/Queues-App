import { Controller, Get } from '@nestjs/common';
import { QueueService } from './queues.service';

@Controller('queues')
export class QueueController {
  constructor(private readonly appService: QueueService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
