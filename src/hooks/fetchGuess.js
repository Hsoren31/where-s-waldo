async function fetchGuess(url, guess) {
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(guess),
    });
    let { result } = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export default fetchGuess;
