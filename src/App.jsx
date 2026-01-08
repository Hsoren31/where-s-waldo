import { useRef, useState, useEffect } from "react";
import "./App.css";
import CharacterModal from "./components/CharacterModal/CharacterModal";
import Stopwatch from "./components/CharacterModal/Stopwatch";
import { ToastContainer, toast } from "react-toastify";
import fetchGuess from "../src/hooks/fetchGuess";

function App() {
  const modalRef = useRef();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [mouseCoordinates, setMouseCoordinates] = useState({
    x: null,
    y: null,
  });
  const [markers, setMarkers] = useState([]);
  const stage = "http://localhost:5433/96533e1a-d0b0-46ec-ab56-5c8157b0c2ac";
  const [characterList, setCharacterList] = useState([
    { name: "Waldo" },
    { name: "Wenda" },
    { name: "Odlaw" },
    { name: "Wizard" },
    { name: "Woof" },
  ]);

  function updateMarkers(newMarker) {
    setMarkers([...markers, newMarker]);
  }

  async function handleGuessSubmit(e) {
    const character = e.target.value;
    const guess = mouseCoordinates;
    let result = await fetchGuess(stage, { character, guess });
    if (result) {
      let newMarker = {
        id: new Date().getTime(),
        x: mouseCoordinates.x,
        y: mouseCoordinates.y,
      };
      updateMarkers(newMarker);
      setCharacterList(characterList.filter((c) => c.name !== character));
      closeModal();
      toast("Found!");
      return;
    }
    closeModal();
    toast("Try again.");
  }

  const handleOutsideClick = (e) => {
    if (e.target === modalRef.current) {
      closeModal();
    }
  };

  const openModal = (e) => {
    setMouseCoordinates({ x: e.pageX, y: e.pageY });
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  const resetGame = () => {
    setCharacterList([
      { name: "Waldo" },
      { name: "Wenda" },
      { name: "Odlaw" },
      { name: "Wizard" },
      { name: "Woof" },
    ]);
    setMarkers([]);
    setTime(0);
    setIsRunning(true);
  };

  const endGame = () => {
    if (characterList.length === 0) {
      setIsRunning(false);
      toast("You Won!");
      resetGame();
    }
  };

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  endGame();

  return (
    <>
      <ToastContainer />
      <Stopwatch time={time} />
      <h1>Space Station</h1>
      <img
        onClick={openModal}
        src="../space_station_wheres_waldo.jpg"
        alt="where's waldo location"
      />
      {markers.map((marker) => (
        <i
          key={marker.id}
          className="fa-regular fa-circle-check marker"
          style={{
            left: marker.x,
            top: marker.y,
          }}
        ></i>
      ))}
      <dialog
        ref={modalRef}
        onClick={handleOutsideClick}
        className="character-dialog"
        style={{ top: mouseCoordinates.y, left: mouseCoordinates.x }}
      >
        <CharacterModal
          closeModal={closeModal}
          handleGuessSubmit={handleGuessSubmit}
        />
      </dialog>
    </>
  );
}

export default App;
