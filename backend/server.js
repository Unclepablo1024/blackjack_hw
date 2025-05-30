const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Sample route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Blackjack API!" });
});

// Mount routes
const gameRoutes = require("./routes/gameRoutes");
app.use("/api/games", gameRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect("mongodb://127.0.0.1:27017/blackjack", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

