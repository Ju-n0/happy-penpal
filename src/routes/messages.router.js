const { Router } = require("express");

const messagesController = require("../controllers/messageController");

const router = new Router();

router.get("/messages", messagesController.getAll);

module.exports = router;
