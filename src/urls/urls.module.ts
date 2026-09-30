import { Module } from '@nestjs/common';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { user } from '../users/entities/user.entity';
import { redirect } from './redirect.controller';
import { AnalyticsModule } from '../analytics/analytics.module';


@Module({
  imports:[TypeOrmModule.forFeature([Url,user]), AnalyticsModule],
  controllers: [UrlsController,redirect],
  providers: [UrlsService],
  
})
export class UrlsModule {}
