import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/modules/AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(80);
}

bootstrap();
