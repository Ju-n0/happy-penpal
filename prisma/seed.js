const { prismaClient } = require("../src/database");
const faker = require("faker");

const languages = [
  "french",
  "english",
  "italian",
  "spanish",
  "portuguese",
  "german",
  "hungarian",
  "chinese",
  "japanese",
  "russian",
  "polish",
  "dutch",
  "arabic",
];

async function resetLanguages() {
  await prismaClient.language.deleteMany();
  await prismaClient.$executeRaw`ALTER SEQUENCE languages_id_seq RESTART WITH 1`;
}

async function resetPosts() {
  await prismaClient.post.deleteMany();
  await prismaClient.$executeRaw`ALTER SEQUENCE posts_id_seq RESTART WITH 1`;
}

async function resetUsers() {
  await prismaClient.user.deleteMany();
  await prismaClient.$executeRaw`ALTER SEQUENCE users_id_seq RESTART WITH 1`;
}

async function resetDB() {
  await resetPosts();
  await resetUsers();
  await resetLanguages();
}

async function seedUsers() {
  const users = [];

  for (let i = 0; i < 10; i++) {
    const gender = faker.name.gender(i % 2 === 0);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);

    const user = {
      username: faker.internet.userName(firstName, lastName),
      password: faker.datatype.string(),
      email: faker.internet.email(firstName, lastName),
      gender,
      country: faker.address.country(),
      presentation: faker.lorem.paragraphs(4),
      createdAt: new Date(),
    };

    users.push(user);
  }

  await prismaClient.user.createMany({
    data: users,
  });
}

async function seedLanguages() {
  const users = await prismaClient.user.findMany();

  for (const language of languages) {
    const usersToPick = faker.datatype.number({ min: 1, max: users.length });
    const speakers = [];

    for (let i = 0; i < usersToPick; i++) {
      const randomUser = faker.random.arrayElement(users);
      speakers.push({ id: randomUser.id });
    }

    await prismaClient.language.create({
      data: {
        name: language,
        speakers: {
          connect: speakers,
        },
      },
    });
  }
}

async function main() {
  await resetDB();
  await seedUsers();
  await seedLanguages();
}

main();
