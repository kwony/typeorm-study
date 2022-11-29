import { EntityManager } from 'typeorm';
import { AppDataSource } from './data-source';
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

AppDataSource.initialize()
  .then(async () => {
    createOneToOneExamples(AppDataSource.manager);
    getOneToOneExamples(AppDataSource.manager);
  })
  .catch((error) => console.log(error));
