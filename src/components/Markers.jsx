function Markers({ markers }) {
  return (
    <>
      {markers &&
        markers.map((marker) => (
          <i
            key={marker.id}
            className="fa-regular fa-circle-check marker"
            style={{
              left: marker.x + "%",
              top: marker.y + "%",
            }}
          ></i>
        ))}
    </>
  );
}

export default Markers;
