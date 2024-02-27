const { prismaClient } = require("../database");
const dayjs = require("dayjs");
const emailValidator = require("email-validator");
dayjs.extend(require("dayjs/plugin/relativeTime"));

const registerController = {
  index(req, res) {
    res.render("register");
  },
  async register(req, res) {
    const { username, email, password, passwordConfirm } = req.body;

    if (!emailValidator.validate(email)) {
      console.log("email invalide");
    }

    const alreadyExists = await prismaClient.user.findUnique({ where: { email: email } });

    if (alreadyExists) {
      console.log("Adresse email déjà utilisée");
    }

    if (password !== passwordConfirm) {
      console.log("Mot de passe incorrect");
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    await prismaClient.user.create({
      username,
      email: email,
      password: hash,
    });

    res.render("/", {
      message: "Vous pouvez maintenant vous connecter !",
    });
  },
};

module.exports = registerController;
