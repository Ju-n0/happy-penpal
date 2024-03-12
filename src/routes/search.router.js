const { Router } = require("express");

const searchController = require("../controllers/searchController.js");

const router = new Router();

router.get("/search", searchController.index);
router.post("/search", searchController.getProfiles);

module.exports = router;
