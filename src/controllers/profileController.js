const { prismaClient } = require("../database");
const dayjs = require("dayjs");
dayjs.extend(require("dayjs/plugin/relativeTime"));

const profileController = {
  async getOne(req, res) {
    const userId = +(req.params.id ?? req.session.user_obj?.id);

    if (!userId) {
      return res.redirect("/");
    }

    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
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
