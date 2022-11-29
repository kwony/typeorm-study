import { EntityManager } from 'typeorm';
import { AppDataSource } from './data-source';
import { Photo } from './entity/Photo';
import { Profile } from './entity/Profile';
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

AppDataSource.initialize()
  .then(async () => {
    // createOneToOneExamples(AppDataSource.manager);
    // getOneToOneExamples(AppDataSource.manager);

    // createOneToMany(AppDataSource.manager);
    getOneToMany(AppDataSource.manager);
    updateOneToMany(AppDataSource.manager);
  })
  .catch((error) => console.log(error));
