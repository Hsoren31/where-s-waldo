import fetchGuess from "../../hooks/fetchGuess";
import "./CharacterModal.css";
import { useEffect, useRef, useState } from "react";

function CharacterModal({ modal, setModal, toggleMenu, mouseCoordinates }) {
  const dialogRef = useRef();
  const [markers, setMarkers] = useState([]);
  const [character, setCharacter] = useState("Waldo");
  const guess = mouseCoordinates;
  const stage1url =
    "http://localhost:5433/96533e1a-d0b0-46ec-ab56-5c8157b0c2ac";

  const handleOutsideClick = (e) => {
    if (e.target === dialogRef.current) {
      setModal(false);
      dialogRef.current.close();
    }
  };

  async function handleSubmit() {
    let result = await fetchGuess(stage1url, { character, guess });
    if (result) {
      let newMarker = {
        id: new Date().getTime(),
        x: mouseCoordinates.x,
        y: mouseCoordinates.y,
      };
      setMarkers([...markers, newMarker]);
      setModal(false);
      dialogRef.current.close();
      return;
    }
    setModal(false);
    dialogRef.current.close();
    alert(result);
  }

  useEffect(() => {
    if (modal) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [modal]);

  return (
    <>
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
      {modal && (
        <div
          className="img_target"
          style={{
            top: mouseCoordinates.y,
            left: mouseCoordinates.x,
          }}
        ></div>
      )}
      <dialog
        id={"character_menu"}
        ref={dialogRef}
        onClick={handleOutsideClick}
        style={{
          top: mouseCoordinates.y,
          left: mouseCoordinates.x + 10,
        }}
      >
        <button onClick={toggleMenu}>Close</button>
        <form action={handleSubmit}>
          <select
            name="characters"
            id="character-select"
            value={character}
            onChange={(e) => setCharacter(e.target.value)}
          >
            <option value="Waldo">Waldo</option>
            <option value="Wenda">Wenda</option>
            <option value="Wizard">Wizard Whitebeard</option>
            <option value="Odlaw">Odlaw</option>
            <option value="Woof">Woof</option>
          </select>
          <button type="submit">Check</button>
        </form>
      </dialog>
    </>
  );
}

export default CharacterModal;
