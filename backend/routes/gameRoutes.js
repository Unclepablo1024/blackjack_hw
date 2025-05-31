const express = require("express");
const router = express.Router();
const { startGame, hit, stand, getAllGames } = require("../controllers/gameController");

router.get("/", getAllGames);           // GET all games
router.post("/start", startGame);       // Start new game
router.put("/:id/hit", hit);            // Hit
router.put("/:id/stand", stand);        // Stand

module.exports = router;
