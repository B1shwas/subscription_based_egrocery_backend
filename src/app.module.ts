import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFactory } from './database/database.factory';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors';
import { GlobalExceptionFilter } from './common/filters';
import { SwaggerAuthMiddleware } from './swagger/swagger.middleware';
import { UserModule } from './modules/user/user.module';
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from './modules/auth/auth.module';
import { HttpLoggerMiddleware } from './common/middlewares/logger.middleware';
import { databaseConfig, swaggerConfig, tokenConfig } from './config';
import { HealthController } from './modules/health/health.controller';
import { JwtAuthGuard } from './modules/auth/guards/jwt.guard';
import { RolesGuard } from './modules/auth/guards/role.guard';
import { AddressModule } from './modules/address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [databaseConfig, swaggerConfig, tokenConfig],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseFactory,
      inject: [ConfigService],
    }),
    UserModule,
    TerminusModule,
    AuthModule,
    AddressModule,
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
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [HealthController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
      .apply(SwaggerAuthMiddleware)
      .forRoutes({ path: '/docs', method: RequestMethod.ALL });
  }
}
