import React from "react";

import Card from "../UI/Card";

const Score = ({ correct, questions, onClick }) => {
  return (
    <Card className="score-content">
      <h2>Your score:</h2>
      <p>
        You answered {((correct / questions.length) * 100).toFixed(0)}% of
        questions correctly
      </p>
      <button className="again-quiz" onClick={onClick}>
        Play again
      </button>
    </Card>
  );
};

export default Score;
