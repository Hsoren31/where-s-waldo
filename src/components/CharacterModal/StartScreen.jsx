import { useEffect, useRef } from "react";
function StartScreen({ startScreen, startGame }) {
  const dialogRef = useRef();

  useEffect(() => {
    if (startScreen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [startScreen]);

  return (
    <dialog ref={dialogRef}>
      <h1>Space Station</h1>
      <button onClick={startGame}>Start</button>
    </dialog>
  );
}

export default StartScreen;
