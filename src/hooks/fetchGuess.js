async function fetchGame(stageTitle) {
  try {
    const response = await fetch(
      `https://wheres-waldo-api-production-a65d.up.railway.app/game/create/${stageTitle}`,
      {
        method: "POST",
        credentials: "include",
        mode: "cors",
      }
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function fetchGuess(stageTitle, guess) {
  try {
    const game = localStorage.getItem("game");
    const response = await fetch(
      `https://wheres-waldo-api-production-a65d.up.railway.app/game/guess/${stageTitle}`,
      {
        method: "Post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId: game, guess }),
      }
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function fetchLeaderboard() {
  try {
    const response = await fetch(
      `https://wheres-waldo-api-production-a65d.up.railway.app/game/space_station`,
      {
        method: "Get",
      }
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export { fetchGame, fetchGuess, fetchLeaderboard };
