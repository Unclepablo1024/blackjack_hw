import { useEffect, useState } from "react";

const API_BASE = "http://localhost:3001/api/games";

export default function GameHistory() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error("Error fetching game history:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="GameHistory">
      <h3>Game History</h3>
      {loading ? (
        <p>Loading game history...</p>
      ) : games.filter(game => game.result !== "in progress").length === 0 ? (
        <p>No completed games yet.</p>
      ) : (
        <ul>
          {games
            .filter((game) => game.result !== "in progress")
            .map((game) => (
              <li key={game._id}>
                <strong>{game.playerName}</strong> bet ${game.bet} –{" "}
                <em>{game.result.toUpperCase()}</em>
                <br />
                🃏 Player: {game.playerHand.join(", ")}<br />
                🧑‍💼 Dealer: {game.dealerHand.join(", ")}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
