import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFactory } from './database/database.factory';
import swaggerConfig from './config/swagger.config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors';
import { GlobalExceptionFilter } from './common/filters';
import { SwaggerAuthMiddleware } from './swagger/swagger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [databaseConfig, swaggerConfig],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseFactory,
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SwaggerAuthMiddleware)
      .forRoutes({ path: '/docs', method: RequestMethod.ALL });
  }
}
