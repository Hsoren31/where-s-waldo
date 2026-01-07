import "./CharacterModal.css";

function CharacterModal({ closeModal, handleGuessSubmit }) {
  return (
    <div className="character-modal">
      <div className="target"></div>
      <div className="character-menu">
        <button onClick={closeModal}>Close</button>
        <button value={"Waldo"} onClick={handleGuessSubmit}>
          Waldo
        </button>
        <button value={"Wenda"} onClick={handleGuessSubmit}>
          Wenda
        </button>
        <button value={"Odlaw"} onClick={handleGuessSubmit}>
          Odlaw
        </button>
        <button value={"Wizard"} onClick={handleGuessSubmit}>
          Wizard
        </button>
        <button value={"Woof"} onClick={handleGuessSubmit}>
          Woof
        </button>
      </div>
    </div>
  );
}

export default CharacterModal;
