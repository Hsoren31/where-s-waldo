import { useRef, useState } from "react";
import "./App.css";
import CharacterModal from "./components/CharacterModal/CharacterModal";
import { ToastContainer, toast } from "react-toastify";
import fetchGuess from "../src/hooks/fetchGuess";

function App() {
  const modalRef = useRef();
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

  return (
    <>
      <ToastContainer />
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
