import "./CharacterModal.css";

function CharacterModal({
  showTarget,
  closeTarget,
  coordinates,
  handleGuessSubmit,
  characters,
}) {
  return (
    <>
      {showTarget && (
        <>
          <div
            onClick={closeTarget}
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
  const notFound = list.filter((listItem) => listItem.found !== true);
  const listItems = notFound.map((listItem) => (
    <li key={listItem.name}>
      <button
        onClick={handleGuessSubmit}
        value={listItem.name}
        className="checklist_btn"
      >
        {listItem.name}
      </button>
    </li>
  ));
  return <ul>{listItems}</ul>;
}

export default CharacterModal;
