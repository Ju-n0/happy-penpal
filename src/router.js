const { Router } = require("express");
const appController = require("./controllers/appController");
const { messagesRouter, profileRouter, searchRouter, registerRouter } = require("./routes/index");

const router = new Router();

router.get("/", appController.index);

router.use(messagesRouter);
router.use(profileRouter);
router.use(searchRouter);
router.use(registerRouter);

module.exports = router;
