import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger.config';

async function server() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
server();
