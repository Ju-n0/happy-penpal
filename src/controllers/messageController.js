const messageController = {
  async getAll(req, res) {
    res.render("messages");
  },
};

module.exports = messageController;
