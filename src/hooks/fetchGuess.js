async function fetchGame() {
  try {
    const response = await fetch(
      `https://wheres-waldo-api-production-a65d.up.railway.app/game/create/225ed2df-0c5f-4db7-a291-1f5913c09f06`,
      {
        method: "POST",
        credentials: "include",
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

async function fetchGuess(guess) {
  try {
    const response = await fetch(
      "https://wheres-waldo-api-production-a65d.up.railway.app/game/guess",
      {
        method: "Post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guess),
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
      `https://wheres-waldo-api-production-a65d.up.railway.app/game/6b18a2d4-d1e0-4e84-90a8-67355098645b`,
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
