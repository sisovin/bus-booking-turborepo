import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';
import { PrismaClient } from '@prisma/client';
import { softDeleteMiddleware } from './shared/middleware/soft-delete.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply the TransformInterceptor globally
  app.useGlobalInterceptors(new TransformInterceptor());

  // Apply the softDeleteMiddleware to the Prisma client
  const prisma = new PrismaClient();
  prisma.$use(softDeleteMiddleware());

  await app.listen(3000);
}
bootstrap();
