import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

export default function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/games"
        );
        setGames(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGames();
  }, []); // ✅ No warning now

  const deleteGame = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/games/${id}`
      );

      // refresh after delete
      setGames((prev) =>
        prev.filter((g) => g.id !== id)
      );
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="home">

      <div className="hero">
        <h1>Track Your Gaming Journey</h1>
        <p>
          Rate games. Clear your backlog. Stay organized.
        </p>
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <div className="game-card" key={game.id}>

            <img
              src={game.image}
              alt={game.title}
              className="game-image"
            />

            <div className="game-info">
              <h3>{game.title}</h3>
              <p>Platform: {game.platform}</p>

              <span className={`status ${game.status}`}>
                {game.status}
              </span>

              <p>
                Rating: {game.rating || "N/A"}
              </p>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteGame(game.id)
                }
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}