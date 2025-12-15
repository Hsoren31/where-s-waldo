import { useState } from "react";
import "./App.css";
import CharacterModal from "./components/CharacterModal/CharacterModal";

function App() {
  const [modal, setModal] = useState(false);
  const [mouseCoordinates, setMouseCoordinates] = useState({
    x: null,
    y: null,
  });

  function toggleMenu(e) {
    setMouseCoordinates({ x: e.pageX, y: e.pageY });
    modal ? setModal(false) : setModal(true);
  }

  return (
    <>
      <h1>Space Station</h1>
      <img
        onClick={toggleMenu}
        src="../space_station_wheres_waldo.jpg"
        alt="where's waldo location"
      />
      <CharacterModal
        modal={modal}
        setModal={setModal}
        toggleMenu={toggleMenu}
        mouseCoordinates={mouseCoordinates}
      />
    </>
  );
}

export default App;
