import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Blog } from './entity/Book';
import { Category } from './entity/Category';
import { Photo } from './entity/Photo';
import { Profile } from './entity/Profile';
import { Question } from './entity/Question';
import { User } from './entity/User';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'common',
  password: 'common',
  database: 'common',
  synchronize: true,
  logging: true,
  entities: [User, Profile, Photo, Question, Category, Blog],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;