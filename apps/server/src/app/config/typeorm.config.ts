import { DatabaseEnvironmentInterface } from '@/src/shared/types/database-environment';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const config =
      this.configService.get<DatabaseEnvironmentInterface>('database');

    return {
      type: 'postgres', // or 'postgres', 'mongodb', etc.
      host: config?.host,
      port: config?.port,
      username: config?.username,
      password: config?.password,
      database: config?.database,
      autoLoadEntities: true,
      synchronize: false, // Set to false in production
      entities: [__dirname + '../../modules/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '../../database/migrations/*{.ts,.js}'],
      migrationsRun: false,
      migrationsTableName: 'migrations',
      migrationsTransactionMode: 'all',
    };
  }
}
