const messageController = {
  async index(req, res) {
    res.render("messages");
  },
};

module.exports = messageController;
