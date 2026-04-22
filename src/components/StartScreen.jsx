import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
function StartScreen({ title, startScreen, startGame }) {
  const dialogRef = useRef();
  const [HowToPlayVisibility, setHowToPlayVisibility] = useState(false);
  const navigate = useNavigate();

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
    <dialog ref={dialogRef} id="start_screen">
      <h1>{title}</h1>
      {HowToPlayVisibility ? (
        <HowToPlay close={closeHowTo} />
      ) : (
        <>
          <button onClick={startGame}>Start</button>
          <button onClick={showHowTo}>How to Play</button>

          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
        </>
      )}
    </dialog>
  );
}

function HowToPlay({ close }) {
  return (
    <div>
      <p>
        Your goal is to find Waldo and his friends as quickly as you can! Click
        anywhere on the image and select the character you found. Keep going
        until you've found everyone!
      </p>
      <p>Note: Woof the dog is obscured and only his tail is showing.</p>
      <button onClick={close}>Close</button>
    </div>
  );
}

export default StartScreen;
