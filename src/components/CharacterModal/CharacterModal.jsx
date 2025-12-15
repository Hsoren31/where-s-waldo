import "./CharacterModal.css";
import { useEffect, useRef } from "react";

function CharacterModal({ modal, setModal, toggleMenu, mouseCoordinates }) {
  const dialogRef = useRef();

  const handleOutsideClick = (e) => {
    if (e.target === dialogRef.current) {
      setModal(false);
      dialogRef.current.close();
    }
  };

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
        <form action="#">
          <select name="characters" id="character-select">
            <option value="waldo">Waldo</option>
            <option value="wenda">Wenda</option>
            <option value="wizard">Wizard Whitebeard</option>
            <option value="odlaw">Odlaw</option>
            <option value="woof">Woof</option>
          </select>
          <button type="submit">Check</button>
        </form>
      </dialog>
    </>
  );
}

export default CharacterModal;
