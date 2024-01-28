const express = require("express");
const router = express.Router();
const appController = require("../controllers/appController.js");

router.get("/", appController.index);

module.exports = router;
