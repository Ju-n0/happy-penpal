const appController = {
  async index(req, res) {
    if (req.session.user_obj) return res.redirect("/profile");

    res.render("index");
  },
};

module.exports = appController;
