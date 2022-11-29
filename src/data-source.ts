import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Category } from './entity/Category';
import { Photo } from './entity/Photo';
import { Question } from './entity/Question';
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
  entities: [Category, Question, User, Photo],
  migrations: [],
  subscribers: [],
});
