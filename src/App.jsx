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
      <main>
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
      </main>
      <footer>
        <p>
          Project on{" "}
          <a href="https://github.com/Hsoren31/where-s-waldo" target="_blank">
            Github
          </a>
          . Created by Haley Sorensen
        </p>
      </footer>
    </>
  );
}

function Card({ image, title }) {
  return (
    <div className="stage_card">
      <Link to={`/${title}`}>
        <div className="img_card">
          <img src={image} />
        </div>
        <h2>{title}</h2>
      </Link>
    </div>
  );
}

export default App;
