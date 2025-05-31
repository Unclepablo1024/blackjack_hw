const Game = require("../models/Game");

const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const generateDeck = () => {
  return suits.flatMap((suit) => values.map((val) => `${val}${suit}`));
};

const shuffle = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const getHandValue = (hand) => {
  let total = 0;
  let aces = 0;

  hand.forEach(card => {
    const val = card.slice(0, -1);
    if (["K", "Q", "J"].includes(val)) total += 10;
    else if (val === "A") {
      total += 11;
      aces += 1;
    } else {
      total += parseInt(val, 10);
    }
  });

  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }

  return total;
};

const startGame = async (req, res) => {
  const { playerName, bet } = req.body;
  if (!playerName || !bet) return res.status(400).json({ error: "Name and bet required" });

  const deck = shuffle(generateDeck());
  const playerHand = [deck.pop(), deck.pop()];
  const dealerHand = [deck.pop(), deck.pop()];

  const game = await Game.create({
    playerName,
    bet,
    playerHand,
    dealerHand: [dealerHand[0]],
    result: "in progress"
  });

  res.status(201).json({ gameId: game._id, playerHand, dealerCard: dealerHand[0] });
};

const hit = async (req, res) => {
  const game = await Game.findById(req.params.id);
  if (!game || game.result !== "in progress") return res.status(400).json({ error: "Invalid game" });

  const deck = shuffle(generateDeck().filter(card => ![...game.playerHand, ...game.dealerHand].includes(card)));
  const newCard = deck.pop();
  game.playerHand.push(newCard);

  const value = getHandValue(game.playerHand);
  if (value > 21) {
    game.result = "lose";
  }

  await game.save();
  res.json({ playerHand: game.playerHand, result: game.result || "in progress" });
};

const stand = async (req, res) => {
  const game = await Game.findById(req.params.id);
  if (!game || game.result !== "in progress") return res.status(400).json({ error: "Invalid game" });

  const deck = shuffle(generateDeck().filter(card => ![...game.playerHand, ...game.dealerHand].includes(card)));

  let dealerHand = [...game.dealerHand];
  while (getHandValue(dealerHand) < 17) {
    dealerHand.push(deck.pop());
  }

  const playerValue = getHandValue(game.playerHand);
  const dealerValue = getHandValue(dealerHand);

  if (dealerValue > 21 || playerValue > dealerValue) game.result = "win";
  else if (playerValue < dealerValue) game.result = "lose";
  else game.result = "push";

  game.dealerHand = dealerHand;
  await game.save();

  res.json({ playerHand: game.playerHand, dealerHand, result: game.result });
};

// ✅ NEW: Get all games
const getAllGames = async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch games" });
  }
};

module.exports = {
  startGame,
  hit,
  stand,
  getAllGames // ✅ export it
};
