import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(15);
  const [message, setMessage] = useState("");

  // function to add value
  function addValue() {
    if (counter < 20) {
      setCounter(counter + 1);
      setMessage(""); // clear any previous message
    } else {
      setMessage("🚫 Maximum limit reached (20)");
    }
  }

  // function to remove value
  function removeValue() {
    if (counter > 0) {
      setCounter(counter - 1);
      setMessage(""); // clear message when valid action
    } else {
      setMessage("⚠️ Counter cannot go below 0");
    }
  }

  return (
    <>
      <h1>Chai aur React</h1>
      <h2>Counter Value: {counter}</h2>

      <button onClick={addValue}>Add Value</button>
      <br />
      <button onClick={removeValue}>Remove Value</button>

      {/* Conditional message display */}
      {message && <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
    </>
  );
}

export default App;

