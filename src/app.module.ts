import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubModule } from './github/github.module';
@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(), GithubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
