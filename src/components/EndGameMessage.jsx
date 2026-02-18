import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

function EndGameMessage({ gameOver, time }) {
  const modalRef = useRef();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setName(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("http://localhost:5433/game/leaderboard", {
      method: "Post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    }).then(navigate("/leaderboard"));
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
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>Enter</button>
          </form>
        </dialog>
      )}
    </>
  );
}

export default EndGameMessage;
