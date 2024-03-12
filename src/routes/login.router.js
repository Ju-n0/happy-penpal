const { Router } = require("express");

const loginController = require("../controllers/loginController.js");

const router = new Router();

router.post("/", loginController.postLogin);

router.get("/logout", loginController.logOut);

module.exports = router;
