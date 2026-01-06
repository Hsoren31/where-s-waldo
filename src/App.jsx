import { useState } from "react";
import "./App.css";
import CharacterModal from "./components/CharacterModal/CharacterModal";

function App() {
  const [modal, setModal] = useState(false);
  const [mouseCoordinates, setMouseCoordinates] = useState({
    x: null,
    y: null,
  });
  const [markers, setMarkers] = useState([]);

  function toggleMenu(e) {
    setMouseCoordinates({ x: e.pageX, y: e.pageY });
    modal ? setModal(false) : setModal(true);
  }

  function updateMarkers(newMarker) {
    setMarkers([...markers, newMarker]);
  }
  return (
    <>
      <h1>Space Station</h1>
      <img
        onClick={toggleMenu}
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
      <CharacterModal
        modal={modal}
        setModal={setModal}
        toggleMenu={toggleMenu}
        mouseCoordinates={mouseCoordinates}
        updateMarkers={updateMarkers}
      />
    </>
  );
}

export default App;
