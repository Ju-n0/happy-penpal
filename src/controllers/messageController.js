const { prismaClient } = require("../database");

const messageController = {
  async getOne(req, res) {
    const user = await prismaClient.user.findUnique({
      where: {
        // id: +req.session.userId,
        id: +1,
      },
      include: {
        sentMessages: true,
        receivedMessages: true,
      },
    });
    res.render("messages", {
      user: { user },
    });
  },
};

module.exports = messageController;
