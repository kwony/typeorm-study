import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Photo } from './entity/Photo';
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
  entities: [User, Profile, Photo],
  migrations: [],
  subscribers: [],
});
