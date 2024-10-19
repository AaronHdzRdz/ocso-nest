import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors:{
      origin: process.env.allowedOrigin,
      credentials: true
    }
  });
  app.enableCors({
    origin: 'http://localhost:3000', // Asegúrate de que este sea el origen correcto
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true, // Si usas cookies o tokens de autenticación
  });
  app.use(cookieParser())
  const config = new DocumentBuilder()
    .setTitle('Ocso API')
    .setDescription('Api for ocso management')
    .setVersion('0.9')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.listen(4000);
}
bootstrap();
