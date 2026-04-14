import 'reflect-metadata';
import path from 'path';
import { DataSource } from 'typeorm';
import { ProjectEntity } from './entities/ProjectEntity';
import { env } from '../../../config/env';

const migrationsPath = path.join(
  __dirname,
  'migrations',
  path.extname(__filename) === '.js' ? '*.js' : '*.ts',
);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.password,
  database: env.db.name,
  entities: [ProjectEntity],
  migrations: [migrationsPath],
  synchronize: false,
});