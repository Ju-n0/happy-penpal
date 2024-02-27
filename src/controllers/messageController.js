const { prismaClient } = require("../database");

const messageController = {
  async getOne(req, res) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: +req.params.id,
      },
      include: {
        languages: true,
      },
    });
    res.render("profile", {
      user: { ...user, age: dayjs().diff(user.birthdate, "year") },
    });
  },
};

module.exports = messageController;
