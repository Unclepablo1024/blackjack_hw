import { useState } from "react";

const API_BASE = "http://localhost:3001/api/games";

export default function BlackjackGame({ onGameComplete }) {
  const [playerName, setPlayerName] = useState("");
  const [bet, setBet] = useState("");
  const [gameId, setGameId] = useState(null);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [result, setResult] = useState(null);

  const startGame = async () => {
    if (!playerName || !bet) return alert("Please enter your name and bet.");

    try {
      const res = await fetch(`${API_BASE}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerName, bet: parseInt(bet) })
      });

      if (!res.ok) {
        alert("Failed to start game");
        return;
      }

      const data = await res.json();
      setGameId(data.gameId);
      setPlayerHand(data.playerHand);
      setDealerHand([data.dealerCard]); // only show one card
      setResult(null);
    } catch (err) {
      console.error("Start game error:", err);
      alert("Server error starting game.");
    }
  };

  const hit = async () => {
    try {
      const res = await fetch(`${API_BASE}/${gameId}/hit`, { method: "PUT" });
      const data = await res.json();
      setPlayerHand(data.playerHand);
      if (data.result && data.result !== "in progress") {
        setResult(data.result);
        onGameComplete?.(); // refresh game history
      }
    } catch (err) {
      console.error("Hit error:", err);
    }
  };

  const stand = async () => {
    try {
      const res = await fetch(`${API_BASE}/${gameId}/stand`, { method: "PUT" });
      const data = await res.json();
      setPlayerHand(data.playerHand);
      setDealerHand(data.dealerHand);
      setResult(data.result);
      onGameComplete?.(); // refresh game history
    } catch (err) {
      console.error("Stand error:", err);
    }
  };

  const resetGame = () => {
    setGameId(null);
    setPlayerHand([]);
    setDealerHand([]);
    setResult(null);
    // Optionally reset player name and bet:
    // setPlayerName("");
    // setBet("");
  };

  return (
    <div className="BlackjackGame">
      <h2>Start a Blackjack Game</h2>

      {!gameId ? (
        <>
          <input
            type="text"
            placeholder="Player Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Bet"
            value={bet}
            onChange={(e) => setBet(e.target.value)}
          />
          <button onClick={startGame}>Start Game</button>
        </>
      ) : (
        <>
          <p><strong>Your Hand:</strong> {playerHand.map(card => (
            <span className="card" key={card}>{card}</span>
          ))}</p>

          <p><strong>Dealer's Hand:</strong> {dealerHand.map(card => (
            <span className="card" key={card}>{card}</span>
          ))}</p>

          {result && result !== "in progress" ? (
            <>
              <p><strong>Game Result:</strong> {result.toUpperCase()}</p>
              <button onClick={resetGame}>Play Again</button>
            </>
          ) : (
            <>
              <p><strong>Game Result:</strong> IN PROGRESS</p>
              <button onClick={hit}>Hit</button>
              <button onClick={stand}>Stand</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
