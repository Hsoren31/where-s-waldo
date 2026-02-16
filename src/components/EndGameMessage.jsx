import { useEffect, useRef } from "react";

function EndGameMessage({ gameOver, time }) {
  const modalRef = useRef();

  useEffect(() => {
    if (gameOver) {
      modalRef.current.showModal();
    }
  }, [gameOver]);

  return (
    <>
      {gameOver && (
        <dialog ref={modalRef}>
          <h1>Where's Waldo Space Station</h1>
          <h1>WoHoo!!!</h1>
          <p>{time}</p>
        </dialog>
      )}
    </>
  );
}

export default EndGameMessage;
