const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    playerName: { type: String, required: true },
    bet: { type: Number, required: true },
    playerHand: { type: [String], default: [] },
    dealerHand: { type: [String], default: [] },
    result: { type: String, default: "in progress" } // win, lose, push, in progress
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
