import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerAuthMiddleware } from './swagger/swagger.middleware';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './swagger/swagger.config';

async function server() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  const swaggerAuthMiddleware = new SwaggerAuthMiddleware(configService);
  app.use('/docs', (req, res, next) =>
    swaggerAuthMiddleware.use(req, res, next),
  );

  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
server();
