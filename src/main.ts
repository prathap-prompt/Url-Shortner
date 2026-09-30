import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet())
 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true
    })
  );
    app.enableCors({
    origin: process.env.FORNTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config=new DocumentBuilder()
  .setTitle('URL shortner api')
  .setDescription('Api documentation for url shortner backend')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document=SwaggerModule.createDocument(app,config);
  
  SwaggerModule.setup('api',app,document);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
