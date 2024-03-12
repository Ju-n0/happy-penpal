const { Router } = require("express");

const profileController = require("../controllers/profileController.js");

const router = new Router();

router.get("/profile", profileController.getProfile);
router.get("/profile/:id", profileController.getOne);

module.exports = router;
