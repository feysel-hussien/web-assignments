import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectToDatabase } from 'database.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5001);
  await connectToDatabase();
}
bootstrap();
