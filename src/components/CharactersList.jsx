function CharactersList({ characters }) {
  return (
    <div>
      <ul>
        {characters.map((character) =>
          character.found ? (
            <li>
              <del key={character.name}>{character.name}</del>
            </li>
          ) : (
            <li key={character.name}>{character.name}</li>
          )
        )}
      </ul>
    </div>
  );
}

export default CharactersList;
