import { EntityManager } from 'typeorm';
import { AppDataSource } from './data-source';
import { Category } from './entity/Category';
import { Photo } from './entity/Photo';
import { Profile } from './entity/Profile';
import { Question } from './entity/Question';
import { User } from './entity/User';

async function createOneToOneExamples(manager: EntityManager) {
  const profile = new Profile();
  profile.gender = 'male';
  profile.photo = 'me.jpg';

  await manager.save(profile);

  const user = new User();
  user.name = 'Joe Smith';
  user.profile = profile;

  await manager.save(user);
}

async function getOneToOneExamples(manager: EntityManager) {
  const users = await manager
    .getRepository(User)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.profile', 'profile')
    .getMany();

  console.log(users);

  const users2 = await manager.getRepository(User).find({
    relations: {
      profile: true,
    },
  });

  console.log(users2);

  const profiles = await manager.getRepository(Profile).find({
    relations: {
      user: true,
    },
  });

  console.log(profiles);
}

async function createOneToMany(manager: EntityManager) {
  const photo1 = new Photo();
  photo1.url = 'me.jpg';
  await manager.save(photo1);

  const photo2 = new Photo();
  photo2.url = 'me-and-bears.jpg';
  await manager.save(photo2);

  const user = new User();
  user.name = 'John';
  user.photos = [photo1, photo2];

  await manager.save(user);
}

async function getOneToMany(manager: EntityManager) {
  const users = await manager.getRepository(User).find({
    relations: {
      photos: true,
      profile: true,
    },
  });

  console.log(users);
}

async function updateOneToMany(manager: EntityManager) {
  const users = await manager.getRepository(User).find();
  const photo = await manager.getRepository(Photo).findOne({
    where: {
      id: 1,
    },
  });

  // @OneToMany 관계라서 Photo가 이전에 묶여있던 User와의 관계는 끊어지게된다 -> 소유권을 이전할 때 관리하기 편하다
  if (users.length > 0 && photo != null) {
    users[0].photos = [photo];
    manager.save(users[0]);
  }
}

async function createManyToMany(manager: EntityManager) {
  const category1 = new Category();
  category1.name = 'animals';
  await manager.save(category1);

  const category2 = new Category();
  category2.name = 'zoo';
  await manager.save(category2);

  const question = new Question();
  question.title = 'dogs';
  question.text = 'who let the dogs out?';
  question.categories = [category1, category2];
  await manager.save(question);
}

async function getManyToMany(manager: EntityManager) {
  const questions = await manager.getRepository(Question).find({
    relations: {
      categories: true,
    },
    take: 1,
  });

  console.log(questions);
}

async function updateManyToMany(manager: EntityManager) {
  const question = await manager.getRepository(Question).findOne({
    relations: {
      categories: true,
    },
    where: {
      id: 1,
    },
  });

  // 관계를 제거하는 작업. save 할 때 빼주면 된다
  if (question != null) {
    question.categories.length > 0 ? question.categories.pop() : '';

    await manager.save(question);
  }
}

async function createSoftDeletingManyToMany(manager: EntityManager) {
  const category1 = new Category();
  category1.name = `work ${new Date().getDate()}`;

  const category2 = new Category();
  category2.name = `money ${new Date().getDate()}`;

  await manager.save(category1);
  await manager.save(category2);

  const question = new Question();
  question.title = `whowhowho ${new Date().getDate()}}`;
  question.text = 'who is that girl?';
  question.categories = [category1, category2];
  const newQuestion = await manager.save(question);

  console.log(newQuestion);

  await manager.softRemove(newQuestion);
}

AppDataSource.initialize()
  .then(async () => {
    // createOneToOneExamples(AppDataSource.manager);
    // getOneToOneExamples(AppDataSource.manager);
    // createOneToMany(AppDataSource.manager);
    // getOneToMany(AppDataSource.manager);
    // updateOneToMany(AppDataSource.manager);

    // await createManyToMany(AppDataSource.manager);
    // await updateManyToMany(AppDataSource.manager);
    // await getManyToMany(AppDataSource.manager);

    // await createSoftDeletingManyToMany(AppDataSource.manager);

    const questions = await AppDataSource.manager.getRepository(Question).find({
      relations: { categories: true },
    });

    console.log(questions);
  })
  .catch((error) => console.log(error));
