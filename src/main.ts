import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import env from './app/config/env';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3333'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  });
  const config = new DocumentBuilder()
    .setTitle('API Transferência Simplificada')
    .setDescription(
      'Desafio Paguru Api de transferência simplificada entre os usuários',
    )
    .setVersion('1.0.0')
    .addServer('http://localhost:3333')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(env.port || 3333);
}
bootstrap();
