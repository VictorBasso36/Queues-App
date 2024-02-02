import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueService {
  getHello(): string {
    return String(process.env.NODE_ENV);
  }
}
