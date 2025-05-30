const express = require("express");
const router = express.Router();
const { getGame, postGame } = require("../controllers/gameController");

// GET /api/games
router.get("/", getGame);

// POST /api/games
router.post("/", postGame);

module.exports = router;
