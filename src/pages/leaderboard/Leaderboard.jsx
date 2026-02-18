import { useState, useEffect } from "react";
import "./Leaderboard.css";
import { Link } from "react-router";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState(null);

  useEffect(() => {
    async function getLeaderboard() {
      try {
        const response = await fetch(
          `http://localhost:5433/game/05b48208-63b6-46ca-bcc4-9481bae6f489`,
          {
            method: "Get",
          }
        );
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        setLeaderboard(result);
        return result;
      } catch (error) {
        console.error(error);
      }
    }
    getLeaderboard();
  }, []);

  return (
    <>
      <h1>Space Station</h1>
      <h2>High Scores</h2>
      <ul>
        {leaderboard &&
          leaderboard.map((score, index) => (
            <li key={index} className="leaderboard_row">
              <p>{index + 1}</p>
              <p>{score.playerName}</p>
              <p>{score.time}</p>
            </li>
          ))}
      </ul>
      <Link to="/">Go back</Link>
    </>
  );
}

export default Leaderboard;
