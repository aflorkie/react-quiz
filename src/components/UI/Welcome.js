import { useState } from "react";

import logo from "../../logo.svg";
import SetupQuiz from "../Quiz/SetupQuiz";

const Welcome = () => {
  const [setup, setSetup] = useState(false);
  if (setup) {
    return <SetupQuiz />;
  }
  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to React Quiz!!</p>
        <button onClick={() => setSetup(true)} className="App-btn">
          Start Quiz
        </button>
      </header>
    </>
  );
};

export default Welcome;
