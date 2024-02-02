import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getHello(): string {
    return String(process.env.NODE_ENV);
  }
}
