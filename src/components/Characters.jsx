import Markers from "./Markers.jsx";

function Characters({ characterList }) {
  const markerPositions = [
    {
      name: "Waldo",
      marker: { x: 11.14, y: 54.76 },
    },
    {
      name: "Wenda",
      marker: { x: 41, y: 60.95 },
    },
    {
      name: "Odlaw",
      marker: { x: 89, y: 54.76 },
    },
    {
      name: "Wizard Whitebeard",
      marker: { x: 64, y: 62.85 },
    },
    {
      name: "Woof",
      marker: { x: 27.42, y: 69.52 },
    },
  ];

  function findFoundCharactersMarkers(characterList) {
    const markers = [];
    const foundCharacters = characterList.filter((character) => {
      return character.found === true;
    });
    foundCharacters.forEach((character) => {
      let characterMarker = markerPositions.find((character2) => {
        return character2.name === character.name;
      });
      markers.push(characterMarker.marker);
    });
    return markers;
  }

  const markers = findFoundCharactersMarkers(characterList);

  return (
    <div className="frame">
      <img id="characters" src="./waldo-characters.png" />
      <Markers markers={markers} />
    </div>
  );
}

export default Characters;
