const { prismaClient } = require("../database");

const profileController = {
  async getOne(req, res) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    res.render("profile", { user });
  },
};

module.exports = profileController;
