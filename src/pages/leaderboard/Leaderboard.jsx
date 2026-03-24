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
      <table>
        <caption>High Scores</caption>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard &&
            leaderboard.map((score, index) => (
              <tr key={score.id}>
                <td>{index + 1}</td>
                <td>{score.playerName}</td>
                <td>{score.time}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Link to="/">Go back</Link>
    </>
  );
}

export default Leaderboard;
