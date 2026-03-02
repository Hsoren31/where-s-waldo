import { useState, useEffect } from "react";
import "./Leaderboard.css";
import { Link } from "react-router";
import { fetchLeaderboard } from "../../hooks/fetchGuess";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState(null);

  useEffect(() => {
    fetchLeaderboard().then((result) => setLeaderboard(result));
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
