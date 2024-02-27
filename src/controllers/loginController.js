const { prismaClient } = require("../database");
const bcrypt = require("bcrypt");

const loginController = {
  //     showProfile(req, res) {

  //     res.render(`profile`, { user: req.session.user_obj });
  //   },
  async postLogin(req, res) {
    const { email, password } = req.body;
    const user = await prismaClient.user.findUnique({ where: { email: email } });

    const isValid = await bcrypt.compare(password, user.password);

    if (!user || !isValid) {
      return res.redirect("/");
    }

    req.session.user_obj = user;

    res.redirect(`/profile/${user.id}`);
  },
};

module.exports = loginController;
