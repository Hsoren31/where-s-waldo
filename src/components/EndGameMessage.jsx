import { useEffect, useRef } from "react";
import Stopwatch from "./Stopwatch/Stopwatch.jsx";

function EndGameMessage({ showModal, setShowModal, time, resetGame }) {
  const modalRef = useRef();

  useEffect(() => {
    if (showModal) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [showModal]);

  const close = () => {
    modalRef.current.close();
    setShowModal(false);
  };

  return (
    <dialog ref={modalRef}>
      <h1>Where's Waldo Space Station</h1>
      <h1>WoHoo!!!</h1>
      <Stopwatch time={time} />
      <div>
        <button onClick={resetGame}>Restart</button>
        <button onClick={close}>Close</button>
      </div>
    </dialog>
  );
}

export default EndGameMessage;
