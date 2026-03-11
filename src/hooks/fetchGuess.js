async function fetchGame() {
  try {
    const response = await fetch(
      `https://wheres-waldo-api-production-a65d.up.railway.app/game/create/1f229e49-059c-4836-9e87-474b324e7659`,
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
      `https://wheres-waldo-api-production-a65d.up.railway.app/game/1f229e49-059c-4836-9e87-474b324e7659`,
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
