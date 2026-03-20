import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router";

function EndGameMessage({ gameOver, time }) {
  const modalRef = useRef();
  const [name, setName] = useState("");
  const [error, setError] = useState({ state: false, msg: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setName(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const game = localStorage.getItem("game");
    if (!name) {
      setError({ state: true, msg: "Cannot submit empty name" });
      return;
    }
    try {
      const response = await fetch(
        "https://wheres-waldo-api-production-a65d.up.railway.app/game/leaderboard",
        {
          method: "Post",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gameId: game, playerName: name }),
        }
      );
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }
      localStorage.removeItem("game");
      navigate("/leaderboard");
    } catch (err) {
      console.error(err.message);
    }
  }

  function handleSkip() {
    navigate("/leaderboard");
  }

  useEffect(() => {
    if (gameOver) {
      modalRef.current.showModal();
    }
  }, [gameOver]);

  return (
    <>
      {gameOver && (
        <dialog ref={modalRef}>
          <h1>Space Station</h1>
          <h2>Congratulations!!</h2>
          <p>You found everyone in {time}</p>
          <form>
            <label htmlFor="name">Add your score to the Leaderboard</label>
            {error && <p>{error.msg}</p>}
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>Enter</button>
          </form>
          <button onClick={handleSkip}>Skip to Leaderboard</button>
        </dialog>
      )}
    </>
  );
}

export default EndGameMessage;
