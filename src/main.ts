import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { setupApp } from './setup-app';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(
  //   cookieSession({
  //     keys: ['arunscookiesession'],
  //   }),
  // );
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //   }),
  // );
  // setupApp(app);
  const config = new DocumentBuilder()
    .setTitle('Nest Todo')
    .setDescription('This is a todo API using nest framework')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      docExpansion: 'none'
    }
  });
  await app.listen(3000);
}
bootstrap();
