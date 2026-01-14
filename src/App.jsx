import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import CharactersList from "./components/CharactersList";
import CharacterModal from "./components/CharacterModal/CharacterModal";
import fetchGuess from "../src/hooks/fetchGuess";
import EndGameMessage from "./components/EndGameMessage";
import Markers from "./components/Markers";
import StartScreen from "./components/StartScreen";
import Stopwatch from "./components/Stopwatch/Stopwatch";
import "./App.css";

const stage = "http://localhost:5433/e73a4d2f-c53c-4892-9511-af1c0f6764bc";

function App() {
  const [characterList, setCharacterList] = useState([
    { name: "Waldo", found: false },
    { name: "Wenda", found: false },
    { name: "Odlaw", found: false },
    { name: "Wizard", found: false },
    { name: "Woof", found: false },
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [mouseCoordinates, setMouseCoordinates] = useState();
  const [showTarget, setShowTarget] = useState(false);
  const [startScreen, setStartScreen] = useState(true);
  const [time, setTime] = useState(0);

  const startGame = () => {
    setStartScreen(false);
    setIsRunning(true);
  };

  const openTarget = (e) => {
    if (!gameOver) {
      setMouseCoordinates({ x: e.pageX, y: e.pageY });
      showTarget ? setShowTarget(false) : setShowTarget(true);
    }
  };

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
      markCharacterFound(character);
      toast("Found!");
      setShowTarget(false);
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

  function markCharacterFound(characterFound) {
    setCharacterList(
      characterList.map((character) => {
        if (character.name === characterFound) {
          return { ...character, found: true };
        }
        return character;
      })
    );
  }

  const endGame = () => {
    let allCharactersFound = characterList.every(
      (character) => character.found !== false
    );
    if (!gameOver && allCharactersFound) {
      setIsRunning(false);
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setCharacterList([
      { name: "Waldo", found: false },
      { name: "Wenda", found: false },
      { name: "Odlaw", found: false },
      { name: "Wizard", found: false },
      { name: "Woof", found: false },
    ]);
    setMarkers([]);
    setTime(0);
    setIsRunning(true);
    setGameOver(false);
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
      <StartScreen startScreen={startScreen} startGame={startGame} />
      <ToastContainer />
      <div id="sidebar">
        <Stopwatch time={time} />
        <CharactersList characters={characterList} />
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
      <EndGameMessage
        gameOver={gameOver}
        setGameOver={setGameOver}
        time={time}
        resetGame={resetGame}
      />
    </>
  );
}

export default App;
