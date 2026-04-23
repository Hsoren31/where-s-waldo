import "../Game/Game.css";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import CharacterModal from "../../components/CharacterModal";
import { fetchGame, fetchGuess } from "../../hooks/fetchGuess";
import EndGameMessage from "../../components/EndGameMessage";
import Markers from "../../components/Markers";
import StartScreen from "../../components/StartScreen";
import Characters from "../../components/Characters";

function Game() {
  const { stageTitle } = useParams();
  const [stage, setStage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [characterList, setCharacterList] = useState();
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [coordinates, setCoordinates] = useState();
  const [showTarget, setShowTarget] = useState(false);
  const [startScreen, setStartScreen] = useState(true);
  const [time, setTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  const startGame = async () => {
    const game = await fetchGame(stageTitle);
    localStorage.setItem("game", game.id);
    setGameActive(true);
    setCharacterList(game.characters);
    setStartScreen(false);

    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  };

  const openTarget = (e) => {
    const image = document.getElementById("stage");
    const rect = image.getBoundingClientRect();
    const top = rect.top + e.view.scrollY;
    const left = rect.left + e.view.scrollX;
    setCoordinates({
      x: (((e.pageX - left) / e.target.width) * 100).toFixed(2),
      y: (((e.pageY - top) / e.target.height) * 100).toFixed(2),
    });
    if (!gameOver) {
      showTarget ? setShowTarget(false) : setShowTarget(true);
    }
  };

  async function handleGuessSubmit(e) {
    let result = await fetchGuess(stageTitle, {
      characterGuess: e.target.value,
      locationGuess: coordinates,
    });
    if (result.found) {
      console.log(result);
      let newMarker = {
        id: new Date().getTime(),
        x: coordinates.x,
        y: coordinates.y,
      };
      updateCharacters(e.target.value);
      updateMarkers(newMarker);
      toast("Found!");
      setShowTarget(false);
      if (result.gameOver) {
        setGameOver(true);
        setGameActive(false);
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

  function updateCharacters(characterName) {
    const newList = characterList.map((character) => {
      if (character.name === characterName) {
        return { ...character, found: true };
      } else {
        return character;
      }
    });
    setCharacterList(newList);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  useEffect(() => {
    fetch(
      `https://wheres-waldo-api-production-a65d.up.railway.app/stages/${stageTitle}`
    )
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => setStage(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [stageTitle]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }
  if (error) {
    return <p>A network error has occured.</p>;
  }

  return (
    <>
      <StartScreen
        title={stageTitle}
        startScreen={startScreen}
        startGame={startGame}
      />
      <ToastContainer />
      <div id="stage">
        {gameActive && (
          <div id="sidebar">
            <p id="stopwatch">{secondsPassed.toFixed(3)}</p>
            <Characters characterList={characterList} />
          </div>
        )}
        <div className="frame">
          <img
            onClick={openTarget}
            src={stage.image.url}
            className={`${gameActive ? "gameActive" : "gameInActive"}`}
          />
          {gameActive && <Markers markers={markers} />}
        </div>
        <CharacterModal
          characters={characterList}
          showTarget={showTarget}
          coordinates={coordinates}
          handleGuessSubmit={handleGuessSubmit}
          closeTarget={closeTarget}
        />
      </div>
      <EndGameMessage title={stageTitle} time={time} gameOver={gameOver} />
    </>
  );
}

export default Game;
