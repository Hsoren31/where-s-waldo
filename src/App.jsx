import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import CharactersList from "./components/CharactersList";
import CharacterModal from "./components/CharacterModal/CharacterModal";
import { fetchGame, fetchGuess } from "../src/hooks/fetchGuess";
import EndGameMessage from "./components/EndGameMessage";
import Markers from "./components/Markers";
import StartScreen from "./components/StartScreen";
import "./App.css";

function App() {
  const [characterList, setCharacterList] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [mouseCoordinates, setMouseCoordinates] = useState();
  const [showTarget, setShowTarget] = useState(false);
  const [startScreen, setStartScreen] = useState(true);
  const [time, setTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  const startGame = async () => {
    const characters = await fetchGame();
    setCharacterList(characters);
    setStartScreen(false);

    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  };

  const openTarget = (e) => {
    if (!gameOver) {
      setMouseCoordinates({ x: e.pageX, y: e.pageY });
      showTarget ? setShowTarget(false) : setShowTarget(true);
    }
  };

  async function handleGuessSubmit(e) {
    let result = await fetchGuess({
      characterGuess: e.target.value,
      locationGuess: mouseCoordinates,
    });
    if (result) {
      let newMarker = {
        id: new Date().getTime(),
        x: mouseCoordinates.x,
        y: mouseCoordinates.y,
      };
      updateMarkers(newMarker);
      toast("Found!");
      setShowTarget(false);
      if (result.gameEnd) {
        setGameOver(true);
        setTime(result.time);
        clearInterval(intervalRef.current);
      }
      return;
    }
    closeTarget();
    toast("Try again.");
  }

  const closeTarget = () => {
    setShowTarget(false);
  };

  function updateMarkers(newMarker) {
    setMarkers([...markers, newMarker]);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <StartScreen startScreen={startScreen} startGame={startGame} />
      <ToastContainer />
      <div id="sidebar">
        <p>{secondsPassed.toFixed(3)}</p>
        {characterList && <CharactersList characters={characterList} />}
      </div>
      <img
        onClick={openTarget}
        src="../space_station_wheres_waldo.jpg"
        alt="where's waldo location"
      />
      <Markers markers={markers} />
      <CharacterModal
        showTarget={showTarget}
        closeModal={closeTarget}
        coordinates={mouseCoordinates}
        handleGuessSubmit={handleGuessSubmit}
      />
      <EndGameMessage time={time} gameOver={gameOver} />
    </>
  );
}

export default App;
