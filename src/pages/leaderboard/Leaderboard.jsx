import { useState, useEffect } from "react";
import "./Leaderboard.css";
import { Link, useParams } from "react-router";

async function fetchLeaderboard(stageTitle) {
  try {
    const response = await fetch(
      `https://wheres-waldo-api-production-a65d.up.railway.app/game/leaderboard/${stageTitle}`,
      {
        method: "Get",
      }
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

function Leaderboard() {
  const { stageTitle } = useParams();
  const [leaderboard, setLeaderboard] = useState(null);

  useEffect(() => {
    fetchLeaderboard(stageTitle).then((result) => setLeaderboard(result));
  }, [stageTitle]);

  return (
    <div id="leaderboard_content">
      <h1>High Scores</h1>
      <table>
        <caption>{stageTitle}</caption>
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
    </div>
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
