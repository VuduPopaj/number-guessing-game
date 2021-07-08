import { useState, useEffect } from "react";
const randomNumber = Math.floor(Math.random() * 100) + 1;

export default function Game() {
  const [input, setInput] = useState("");
  const [count, setCount] = useState(10);
  const [msg, setMsg] = useState(null);
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const success = <p className="green">Correct Number!</p>;
  const low = <p className="magenta">Number too low!</p>;
  const high = <p className="red">Number too high</p>;

  function inputHandler(e) {
    setInput(parseInt(e.target.value));
  }

  function submitHandler(e) {
    e.preventDefault();
    if (input < 1 || input > 100)
      return alert("Guess a number between 0 and 100!");
    if (input < 1 || input > 100 || count === 0) return;
    if (input === randomNumber) {
      setMsg(success);
      setShowButton(true);
    } else if (input < randomNumber) {
      setCount((prevCount) => prevCount - 1);
      setPreviousGuesses([...previousGuesses, input]);
      setMsg(low);
      setInput("");
    } else {
      setCount((prevCount) => prevCount - 1);
      setPreviousGuesses([...previousGuesses, input]);
      setMsg(high);
      setInput("");
    }
  }

  function clearHandler(e) {
    e.preventDefault();
    setInput("");
  }

  function resetHandler() {
    setInput("");
  }

  useEffect(() => {
    if (count === 0) {
      setMsg(<p className="gameOver">Game Over</p>);
      setShowButton(true);
    }
  }, [count]);

  return (
    <form className="form">
      <h1>Number guessing game</h1>
      <label>Enter a number: </label>
      <input
        type="number"
        min="1"
        max="100"
        value={input}
        onChange={inputHandler}
        autoFocus="autofocus"
      />
      <br />
      <button onClick={submitHandler}>Submit</button>
      <button onClick={clearHandler}>Clear</button>
      <button onClick={resetHandler}>Reset</button>
      <p>Remaining attempts: {count}</p>
      <p>Previous guesses: {previousGuesses.join()}</p>
      {msg}
      {showButton && <button onClick={resetHandler}>Start new game</button>}
    </form>
  );
}
