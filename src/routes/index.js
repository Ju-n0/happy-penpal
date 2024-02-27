const router = require("express").Router();

const messagesRouter = require("./messages.router.js");
const profileRouter = require("./profile.router.js");
const searchRouter = require("./search.router.js");
const registerRouter = require("./register.router.js");

module.exports = { messagesRouter, profileRouter, searchRouter, registerRouter };
