import { useEffect, useRef } from "react";
import Stopwatch from "./Stopwatch/Stopwatch.jsx";

function EndGameMessage({ gameOver, setGameOver, time, resetGame }) {
  const modalRef = useRef();

  useEffect(() => {
    if (gameOver) {
      modalRef.current.showModal();
    }
  }, [gameOver]);

  const close = () => {
    modalRef.current.close();
    setGameOver(false);
  };

  return (
    <>
      {gameOver && (
        <dialog ref={modalRef}>
          <h1>Where's Waldo Space Station</h1>
          <h1>WoHoo!!!</h1>
          <Stopwatch time={time} />
          <div>
            <button onClick={resetGame}>Restart</button>
            <button onClick={close}>Close</button>
          </div>
        </dialog>
      )}
    </>
  );
}

export default EndGameMessage;
