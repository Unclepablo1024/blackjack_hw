import { useEffect, useState } from "react";

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    playerName: "",
    bet: "",
    result: "win"
  });

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = () => {
    fetch("http://localhost:3001/api/games")
      .then((res) => res.json())
      .then((data) => {
  console.log("Fetched data:", data); // 👈 Add this
  setGames(data);
  setLoading(false);

      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setForm({ playerName: "", bet: "", result: "win" });
      fetchGames(); // Refresh the game list
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Game History</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          name="playerName"
          placeholder="Player Name"
          value={form.playerName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="bet"
          placeholder="Bet Amount"
          value={form.bet}
          onChange={handleChange}
          required
        />
        <select name="result" value={form.result} onChange={handleChange}>
          <option value="win">Win</option>
          <option value="lose">Lose</option>
          <option value="push">Push</option>
        </select>
        <button type="submit">Submit Game</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game._id}>
              {game.playerName} bet ${game.bet} — Result: {game.result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
