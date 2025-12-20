import { DataSourceOptions } from 'typeorm';
import configuration from './env.config';
import { config } from 'dotenv';

config();
const env = configuration();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.database,
  entities: ['dist/modules/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
};
