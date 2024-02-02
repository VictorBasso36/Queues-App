import { Module } from '@nestjs/common';
import { QueueService } from './queues.service';

@Module({
  imports: [QueuesModule],
  controllers: [QueuesModule],
  providers: [QueueService],
})
export class QueuesModule {}
