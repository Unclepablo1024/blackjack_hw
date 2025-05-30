const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
  },
  bet: {
    type: Number,
    required: true,
  },
  result: {
    type: String,
    enum: ["win", "lose", "push"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
