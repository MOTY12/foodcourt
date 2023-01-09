import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //port
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  //validation
  app.useGlobalPipes(new ValidationPipe({
    // whitelist: true,
    // forbidNonWhitelisted: true,
    transform: true,
  }));

  //cors
  app.enableCors({
    origin: '*',
  });

  await app.listen(port || 3000);
}
bootstrap();
