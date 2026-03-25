import { Link } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <h1>Where's Waldo</h1>
      </header>
      <div id="stages">
        <Card
          image={"./space_station_wheres_waldo.jpg"}
          title={"Space Station"}
        />
      </div>
    </>
  );
}

function Card({ image, title }) {
  return (
    <div id="stage_card">
      <Link to="/game">
        <img src={image} />
        <h2>{title}</h2>
      </Link>
    </div>
  );
}

export default App;
