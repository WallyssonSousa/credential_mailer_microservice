import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ProjectEntity } from './entities/ProjectEntity';
import { env } from '../../../config/env';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.password,
  database: env.db.name,
  entities: [ProjectEntity],
  migrations: ['src/infrastructure/persistence/typeorm/migrations/*.ts'],
  synchronize: false,
});