const { prismaClient } = require("../database");

const messageController = {
  async getOne(req, res) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: +req.session.user_obj?.id,
      },
      include: {
        sentMessages: true,
        receivedMessages: true,
      },
    });
    res.render("messages", {
      user,
    });
  },
};

module.exports = messageController;
