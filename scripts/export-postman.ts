import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import * as fs from 'fs';
import * as path from 'path';
import * as openapiToPostman from 'openapi-to-postmanv2';
import { createSwaggerDocument } from '../src/documentation/swagger.config';

async function exportPostmanCollection() {
  const app = await NestFactory.create(AppModule);
  const swaggerDoc = createSwaggerDocument(app);

  return new Promise<void>((resolve, reject) => {
    openapiToPostman.convert(
      {
        type: 'json',
        data: swaggerDoc,
      },
      {},
      (err, conversionResult) => {
        if (err || !conversionResult.result) {
          reject(err || new Error(conversionResult.reason));
          return;
        }

        const outputPath = path.resolve(
          __dirname,
          '../postman_collection.json',
        );
        fs.writeFileSync(
          outputPath,
          JSON.stringify(conversionResult.output[0].data, null, 2),
        );
        resolve();
      },
    );
  }).finally(() => app.close());
}

exportPostmanCollection();
