import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('FRESH CART API')
    .setDescription('API docs for Fresh Cart')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
}

export function setupSwagger(app: INestApplication): void {
  const config = getSwaggerConfig();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}

export function createSwaggerDocument(app: INestApplication): OpenAPIObject {
  const config = getSwaggerConfig();
  return SwaggerModule.createDocument(app, config);
}
