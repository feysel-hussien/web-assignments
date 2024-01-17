import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  // app.enableCors(options:{
  //   origin:'http://localhost:5001',
  //   Credential:true
  // })
  await app.use(cookieParser());
  
  await app.listen(5001);
  console.log(`Application is running on:${await app.getUrl()}`)
}
bootstrap();
