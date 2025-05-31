import "./App.css";
import BlackjackGame from "./components/BlackjackGame";
import GameHistory from "./components/GameHistory";
import { useState } from "react";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleGameComplete = () => {
    setRefreshKey(prev => prev + 1); // triggers re-fetch in GameHistory
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", textAlign: "center" }}>
      {/* Main Title */}
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>🎲 Blackjack Table</h1>

      {/* Gameplay Section */}
      <BlackjackGame onGameComplete={handleGameComplete} />

      {/* Divider */}
      <hr style={{ margin: "4rem 0", borderTop: "2px solid #ccc" }} />

      {/* Game History */}
      <div style={{ fontSize:"2rem", maxWidth: "800px", margin: "0 auto" }}>
        <GameHistory key={refreshKey} />
      </div>
    </div>
  );
}

export default App;
