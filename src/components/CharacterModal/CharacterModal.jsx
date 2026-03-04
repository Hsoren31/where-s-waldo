import "./CharacterModal.css";

function CharacterModal({ showTarget, coordinates, handleGuessSubmit }) {
  const characters = ["Waldo", "Wenda", "Odlaw", "Wizard Whitebeard", "Woof"];
  return (
    <>
      {showTarget && (
        <>
          <div
            id="target"
            style={{ top: coordinates.y + "%", left: coordinates.x + "%" }}
          ></div>
          <div id="menu">
            <ChecklistButtons
              list={characters}
              handleGuessSubmit={handleGuessSubmit}
            />
          </div>
        </>
      )}
    </>
  );
}

function ChecklistButtons({ list, handleGuessSubmit }) {
  const listItems = list.map((listItem) => (
    <li>
      <button
        onClick={handleGuessSubmit}
        value={listItem}
        className="checklist_btn"
        key={listItem}
      >
        {listItem}
      </button>
    </li>
  ));
  return <ul>{listItems}</ul>;
}

export default CharacterModal;
