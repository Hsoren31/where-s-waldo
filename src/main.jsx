import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Leaderboard from "./pages/leaderboard/Leaderboard.jsx";
import ErrorPage from "./pages/errorPage";
import Game from "./pages/Game/Game.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:stageTitle",
    element: <Game />,
  },
  {
    path: "/leaderboard/:stageTitle",
    element: <Leaderboard />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
