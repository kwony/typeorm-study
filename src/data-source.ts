import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Profile } from './entity/Profile';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'common',
  password: 'common',
  database: 'common',
  synchronize: true,
  logging: true,
  entities: [User, Profile],
  migrations: [],
  subscribers: [],
});
