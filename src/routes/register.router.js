const { Router } = require("express");

const registerController = require("../controllers/registerController.js");

const router = new Router();

router.get("/register", registerController.index);
router.post("/register", registerController.register);

module.exports = router;
