import { useEffect, useRef, useState } from "react";
function StartScreen({ startScreen, startGame }) {
  const dialogRef = useRef();
  const [HowToPlayVisibility, setHowToPlayVisibility] = useState(false);

  useEffect(() => {
    if (startScreen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [startScreen]);

  function showHowTo() {
    setHowToPlayVisibility(true);
  }

  function closeHowTo() {
    setHowToPlayVisibility(false);
  }

  return (
    <dialog ref={dialogRef}>
      <h1>Space Station</h1>
      <button onClick={showHowTo}>How to Play</button>
      <HowToPlay visibility={HowToPlayVisibility} close={closeHowTo} />
      <button onClick={startGame}>Start</button>
    </dialog>
  );
}

function HowToPlay({ visibility, close }) {
  return (
    <>
      {visibility && (
        <div>
          <p>
            Your goal is to find Waldo and his friends as quickly as you can!
            Click anywhere on the image and select the character you found. Keep
            going until you've found everyone!
          </p>
          <p>Note: Woof the dog is obscured and only his tail is showing.</p>
          <button onClick={close}>Close</button>
        </div>
      )}
    </>
  );
}

export default StartScreen;
