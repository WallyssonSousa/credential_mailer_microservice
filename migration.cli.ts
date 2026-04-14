import 'reflect-metadata';
import { AppDataSource } from './src/infrastructure/persistence/typeorm/data-source';

const runMigrations = async () => {
  try {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    console.log('Migrations executed successfully!');
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
};

runMigrations();
