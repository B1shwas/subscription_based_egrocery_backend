import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DatabaseConfig, databaseConfigName } from 'src/config/database.config';

@Injectable()
export class DatabaseFactory implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const dbConfig =
      this.configService.getOrThrow<DatabaseConfig>(databaseConfigName);

    const { host, port, username, password, name, synchronize, logging } =
      dbConfig;

    const connectionOptions: TypeOrmModuleOptions = {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database: name,
      synchronize,
      logging: false,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    };

    return connectionOptions;
  }
}
