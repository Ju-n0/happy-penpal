const { Router } = require("express");

const messagesController = require("../controllers/messageController");

const router = new Router();

router.get("/messages", messagesController.getOne);

module.exports = router;
