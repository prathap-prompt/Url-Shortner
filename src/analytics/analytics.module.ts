import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Urlclick } from './entities/url_click.entity';
import { AnalyticsController } from './analytics.controller';
import { Url } from 'src/urls/entities/url.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Urlclick,Url])],
  providers: [AnalyticsService],
  exports:[AnalyticsService],
  controllers: [AnalyticsController]
})
export class AnalyticsModule {}
