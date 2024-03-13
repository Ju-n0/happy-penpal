const { Router } = require("express");

const profileController = require("../controllers/profileController.js");
const isAuthorized = require("../middlewares/isAuthorized.js");

const router = new Router();

router.get("/profile", isAuthorized, profileController.showProfile);
router.get("/profile/:id", profileController.getOne);

module.exports = router;
