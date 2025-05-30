const Game = require("../models/Game");

// GET /api/games
const getGame = async (req, res) => {
  try {
    const games = await Game.find(); // ✅ return array of games
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching games" });
  }
};

// POST /api/games
const postGame = async (req, res) => {
  const { playerName, bet, result } = req.body;

  if (!playerName || !bet || !result) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const game = await Game.create({ playerName, bet, result });
    res.status(201).json(game); // ✅ Return created game
  } catch (err) {
    res.status(500).json({ error: "Server error while creating game" });
  }
};

module.exports = {
  getGame,
  postGame
};
