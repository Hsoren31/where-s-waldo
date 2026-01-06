import fetchGuess from "../../hooks/fetchGuess";
import "./CharacterModal.css";
import { useEffect, useRef, useState } from "react";

function CharacterModal({
  modal,
  setModal,
  toggleMenu,
  mouseCoordinates,
  updateMarkers,
}) {
  const dialogRef = useRef();
  const guess = mouseCoordinates;
  const stage1url =
    "http://localhost:5433/96533e1a-d0b0-46ec-ab56-5c8157b0c2ac";
  const [characters, setCharacters] = useState([
    { name: "Waldo" },
    { name: "Wenda" },
    { name: "Odlaw" },
    { name: "Wizard" },
    { name: "Woof" },
  ]);

  const handleOutsideClick = (e) => {
    if (e.target === dialogRef.current) {
      setModal(false);
      dialogRef.current.close();
    }
  };

  async function handleSubmit(e) {
    let character = e.target.value;
    let result = await fetchGuess(stage1url, { character, guess });
    if (result) {
      let newMarker = {
        id: new Date().getTime(),
        x: mouseCoordinates.x,
        y: mouseCoordinates.y,
      };
      updateMarkers(newMarker);
      setModal(false);
      setCharacters(
        characters.filter((character) => character.name !== e.target.value)
      );
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
        <ul>
          {characters.map((character) => (
            <button
              onClick={handleSubmit}
              value={character.name}
              key={character.name}
            >
              {character.name}
            </button>
          ))}
        </ul>
      </dialog>
    </>
  );
}

export default CharacterModal;
