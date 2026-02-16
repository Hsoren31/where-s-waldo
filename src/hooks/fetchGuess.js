async function fetchGame() {
  try {
    const response = await fetch(
      `http://localhost:5433/game/create/05b48208-63b6-46ca-bcc4-9481bae6f489`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return;
  } catch (error) {
    console.error(error);
  }
}

async function fetchGuess(guess) {
  try {
    const response = await fetch("http://localhost:5433/game/guess", {
      method: "Post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(guess),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export { fetchGame, fetchGuess };
