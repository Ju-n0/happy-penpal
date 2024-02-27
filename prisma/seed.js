const { prismaClient } = require("../src/database");
const faker = require("faker");

const messagesCount = 100;
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

const questions = [
  "What advice do you give to your love ones ?",
  "What did you prefer before ?",
  "What makes you proud ?",
  "Would you live in another country ?",
];

async function resetMessages() {
  await prismaClient.message.deleteMany();
  await prismaClient.$executeRaw`ALTER SEQUENCE messages_id_seq RESTART WITH 1`;
}

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

async function resetQuestions() {
  await prismaClient.question.deleteMany();
  await prismaClient.$executeRaw`ALTER SEQUENCE questions_id_seq RESTART WITH 1`;
}

async function resetAnswers() {
  await prismaClient.answer.deleteMany();
  await prismaClient.$executeRaw`ALTER SEQUENCE answers_id_seq RESTART WITH 1`;
}

async function resetDB() {
  await resetMessages();
  await resetPosts();
  await resetUsers();
  await resetLanguages();
  await resetQuestions();
  await resetAnswers();
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
      birthdate: faker.date.between("1950-01-01", "2005-12-31"),
      presentation: faker.lorem.paragraphs(4),
      picture: "dog.jpg",
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

async function seedMessages() {
  const users = await prismaClient.user.findMany();

  for (let i = 0; i < messagesCount; i++) {
    const content = faker.lorem.paragraph();
    const sender = faker.random.arrayElement(users);
    let recipient;

    do {
      recipient = await faker.random.arrayElement(users);
    } while (recipient.id === sender.id);
    const date = faker.date.recent();

    await prismaClient.message.create({
      data: {
        content,
        senderId: sender.id,
        recipientId: recipient.id,
        createdAt: date,
      },
    });
  }
}
async function seedQuestions() {
  for (const question of questions) {
    await prismaClient.question.create({
      data: {
        name: question,
      },
    });
  }
}

async function seedAnswers() {
  const users = await prismaClient.user.findMany();
  const questions = await prismaClient.question.findMany();

  for (const user of users) {
    for (const question of questions) {
      const answerContent = faker.lorem.paragraph();
      // const answererId = user.id;
      // const questionId = question.id;
      const date = faker.date.recent();

      await prismaClient.answer.create({
        data: {
          name: answerContent,
          answererId: user.id,
          questionId: question.id,
          createdAt: date,
        },
      });
    }
  }
}

async function main() {
  await resetDB();
  await seedUsers();
  await seedLanguages();
  await seedMessages();
  await seedQuestions();
  await seedAnswers();
}

main();
