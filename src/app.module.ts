import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFactory } from './database/database.factory';
import swaggerConfig from './config/swagger.config';

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
})
export class AppModule {}
