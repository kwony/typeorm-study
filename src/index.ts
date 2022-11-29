import { CannotGetEntityManagerNotConnectedError, EntityManager } from 'typeorm';
import { AppDataSource } from './data-source';
import { Category } from './entity/Category';
import { Photo } from './entity/Photo';
import { Profile } from './entity/Profile';
import { Question } from './entity/Question';
import { User } from './entity/User';

async function getUserOneToOne(manager: EntityManager) {
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
    // const photo1 = new Photo();
    // photo1.url = 'me.jpg';

    // const photo2 = new Photo();
    // photo2.url = 'me-and-bears.jpg';

    // await AppDataSource.manager.save(photo1);
    // await AppDataSource.manager.save(photo2);

    // const user = new User();
    // user.name = 'John';
    // user.photos = [photo1, photo2];

    // await AppDataSource.manager.save(user);

    // const profile = new Profile();
    // profile.gender = 'male';
    // profile.photo = 'me.jpg';

    // await AppDataSource.manager.save(profile);

    // const user = new User();
    // user.name = 'Joe Smith';
    // user.profile = profile;

    // await AppDataSource.manager.save(user);

    getUserOneToOne(AppDataSource.manager);

    // const users = await AppDataSource.manager
    //   .getRepository(User)
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect('user.profile', 'profile')
    //   .getMany();

    // console.log(users);

    // const photos = await AppDataSource.manager
    //   .getRepository(Photo)
    //   .createQueryBuilder('photo')
    //   .leftJoinAndSelect('photo.users', 'user')
    //   .getMany();

    // console.log(photos);

    // const questionRepository = AppDataSource.manager.getRepository(Question);

    // const questions = await questionRepository.find({
    //   relations: {
    //     categories: true,
    //   },
    // });

    // console.log(questions);

    // const categoriesWithQuestions = await AppDataSource.manager
    //   .getRepository(Category)
    //   .createQueryBuilder('category')
    //   .leftJoinAndSelect('category.questions', 'question')
    //   .getMany();

    // console.log(categoriesWithQuestions);

    // const category1 = new Category();
    // category1.name = 'animals';
    // await AppDataSource.manager.save(category1);

    // const category2 = new Category();
    // category2.name = 'zoo';
    // await AppDataSource.manager.save(category2);

    // const question = new Question();
    // question.title = 'dogs';
    // question.text = 'who let the dogs out';
    // question.categories = [category1, category2];
    // await AppDataSource.manager.save(question);

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)
    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)
    // console.log("Here you can setup and run express / fastify / any other framework.")
  })
  .catch((error) => console.log(error));
