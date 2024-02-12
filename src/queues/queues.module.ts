import { Module } from '@nestjs/common';
import { QueueService } from './queues.service';
import { QueueController } from './queues.controller';

@Module({
  imports: [QueuesModule],
  controllers: [QueueController],
  providers: [QueueService],
})
export class QueuesModule {}
