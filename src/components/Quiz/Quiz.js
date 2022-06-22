import { useState } from "react";

import Welcome from "../UI/Welcome";
import Score from "./Score";
import SetupQuiz from "./SetupQuiz";
import Card from "../UI/Card";

const Quiz = ({ questions }) => {
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [close, setClose] = useState(false);
  const [againQuiz, setAgainQuiz] = useState(false);
  const [isScore, setIsScore] = useState(false);

  const nextQuestion = () => {
    setIndex((nowIndex) => {
      const index = nowIndex + 1;
      if (index > questions.length - 1) {
        showScore();
        return 0;
      } else {
        return index;
      }
    });
  };
  const prevQuestion = () => {
    setIndex((nowIndex) => {
      const index = nowIndex - 1;
      if (index < 1) {
        return 0;
      } else {
        return index;
      }
    });
  };

  const showScore = () => {
    setIsScore(true);
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1);
    }
    nextQuestion();
  };

  if (againQuiz) {
    return <SetupQuiz />;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];

  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  if (close) {
    return <Welcome />;
  }

  if (isScore) {
    return (
      <Card className="score-section">
        <Score
          correct={correct}
          questions={questions}
          onClick={() => setAgainQuiz(true)}
        />
        <button className="close-quiz" onClick={() => setClose(true)}>
          close quiz
        </button>
      </Card>
    );
  }

  return (
    <section className="quiz">
      <p className="question-number">
        question:{index + 1}/{questions.length}
      </p>
      <article className="container">
        <h2 dangerouslySetInnerHTML={{ __html: question }} />
        <div className="answer-container">
          {answers.map((answer, index) => {
            return (
              <button
                key={index}
                className="answer-btn"
                onClick={() => {
                  checkAnswer(correct_answer === answer);
                }}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            );
          })}
        </div>
      </article>
      {index > 0 && (
        <button className="prev-question" onClick={prevQuestion}>
          prev question
        </button>
      )}
      <button className="next-question" onClick={nextQuestion}>
        next question
      </button>
    </section>
  );
};

export default Quiz;
