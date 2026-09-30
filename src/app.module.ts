import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';
import databaseConfig from './config/database.config';
import { TypeOrmModule,TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UrlsModule } from './urls/urls.module';
import { AuthModule } from './auth/auth.module';
import { AnalyticsModule } from './analytics/analytics.module';
import {  ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load:[databaseConfig],
      
       validationSchema: Joi.object({
        DB_HOST:Joi.string().required(),
        DB_PORT:Joi.number().required(),
        DB_USERNAME:Joi.string().required(),
        DB_PASSWORD:Joi.string().required(),
        DB_NAME:Joi.string().required(),
        JWT_SECRET:Joi.string().required()
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      
      useFactory: (ConfigService:ConfigService):TypeOrmModuleOptions=>{
          return ConfigService.get<TypeOrmModuleOptions>('database')!;
      },
           
    }),
    ThrottlerModule.forRoot({
      throttlers:[
        {
          ttl:60000,
          limit:10,
        }
      ]

    }),
    UsersModule,
    UrlsModule,
    AuthModule,
    AnalyticsModule,

      

    
  ],
  controllers: [AppController],
  providers: [{
    provide:APP_GUARD,
    useClass:ThrottlerGuard
  },AppService],
})
export class AppModule {}
