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
          {leaderboard && <LeaderboardTable leaderboard={leaderboard} />}
        </tbody>
      </table>
      <Link to="/">Go back</Link>
    </>
  );
}

function LeaderboardTable({ leaderboard }) {
  const fullLeaderboard = [];

  for (let i = 0; i <= 9; i++) {
    if (leaderboard[i]) {
      fullLeaderboard.push(leaderboard[i]);
    } else {
      fullLeaderboard.push({ playerName: null, time: null });
    }
  }

  return (
    <>
      {fullLeaderboard.map((score, index) => (
        <Score key={score.id} score={score} index={index} />
      ))}
    </>
  );
}

function Score({ score, index }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{score.playerName ? score.playerName : "---"}</td>
      <td>{score.time ? score.time : "---"}</td>
    </tr>
  );
}

export default Leaderboard;
