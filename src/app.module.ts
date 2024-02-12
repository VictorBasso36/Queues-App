import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { QueuesModule } from './queues/queues.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), QueuesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
