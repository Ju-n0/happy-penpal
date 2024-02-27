const { prismaClient } = require("../database");
const dayjs = require("dayjs");
dayjs.extend(require("dayjs/plugin/relativeTime"));

const profileController = {
  async getOne(req, res) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: +req.params.id,
      },
      include: {
        languages: true,
      },
    });

    const answers = await prismaClient.answer.findMany({
      include: { question: true },
      where: { answererId: user.id },
    });

    res.render("profile", {
      user: { ...user, age: dayjs().diff(user.birthdate, "year") },
      answers,
    });
  },
};

module.exports = profileController;
