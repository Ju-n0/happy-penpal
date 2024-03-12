const { prismaClient } = require("../src/database");
const faker = require("faker");
const bcrypt = require("bcrypt");

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

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bangladesh",
  "Belarus",
  "Belgium",
  "Benin",
  "Bolivia",
  "Botswana",
  "Brazil",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Côte d’Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Kazakhstan",
  "Kenya",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Pakistan",
  "Panama",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Samoa",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Somalia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
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

async function resetCountries() {
  await prismaClient.country.deleteMany();
  await prismaClient.$executeRaw`ALTER SEQUENCE countries_id_seq RESTART WITH 1`;
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
  await resetLanguages();
  await resetAnswers();
  await resetQuestions();
  await resetUsers();
  await resetCountries();
}

async function seedUsers() {
  const countries = await prismaClient.country.findMany();
  const users = [];

  for (let i = 0; i < 30; i++) {
    const gender = faker.name.gender(i % 2 === 0);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);

    const country = faker.random.arrayElement(countries);

    const user = {
      username: faker.internet.userName(firstName, lastName),
      password: await bcrypt.hash("1234", 12),
      email: faker.internet.email(firstName, lastName),
      gender: gender.toLowerCase(),
      countryId: country.id,
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

async function seedCountries() {
  for (const country of countries) {
    await prismaClient.country.create({
      data: {
        name: country,
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
  await seedCountries();
  await seedUsers();
  await seedLanguages();
  await seedMessages();
  await seedQuestions();
  await seedAnswers();
}

main();
