import { Link } from "react-router";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [stages, setStages] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://wheres-waldo-api-production-a65d.up.railway.app/stages")
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => setStages(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>A network error has occured.</p>;
  }

  return (
    <>
      <header>
        <h1>Where's Waldo</h1>
      </header>
      <div>
        <ul id="stages">
          {stages &&
            stages.map((stage) => (
              <Card
                key={stage.id}
                image={stage.image.url}
                title={stage.title}
              />
            ))}
        </ul>
      </div>
    </>
  );
}

function Card({ image, title }) {
  return (
    <div id="stage_card">
      <Link to={`/${title}`}>
        <img src={image} />
        <h2>{title}</h2>
      </Link>
    </div>
  );
}

export default App;
