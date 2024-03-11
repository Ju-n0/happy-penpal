const { prismaClient } = require("../database");
const dayjs = require("dayjs");
const emailValidator = require("email-validator");
dayjs.extend(require("dayjs/plugin/relativeTime"));
const bcrypt = require("bcrypt");

const registerController = {
  index(req, res) {
    res.render("register");
  },
  async register(req, res) {
    const { username, gender, country, birthdate, email, password, passwordConfirm } = req.body;

    if (!username || !gender || !country || !birthdate || !email || !password || !passwordConfirm) {
      console.log("Veuillez remplir tous les champs");
    }

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
      data: {
        username,
        gender,
        country,
        birthdate: new Date(birthdate),
        email: email,
        password: hash,
      },
    });

    res.render("index", {
      message: "Vous pouvez maintenant vous connecter !",
    });
  },
};

module.exports = registerController;
