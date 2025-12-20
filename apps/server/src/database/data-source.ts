import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../app/config/database.config';

const AppDataSource = new DataSource({ ...dataSourceOptions });

export default AppDataSource;
