import React, { useState } from "react";
import axios from "axios";

import Loading from "../UI/Loading";
import Quiz from "./Quiz";

const SetupQuiz = () => {
  const [quiz, setQuiz] = useState({
    amount: 5,
    category: "sports",
    difficulty: "easy",
  });
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(false);

  const API = "https://opentdb.com/api.php?";
  const table = {
    geography: 22,
    sports: 21,
    history: 23,
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchData(url);
  };

  const fetchData = async (url) => {
    setLoading(true);
    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(response.data.results);
        setLoading(false);
        setError(false);
      } else {
        setError(true);
      }
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setQuiz({ ...quiz, [name]: value });
  };
  if (loading) {
    return <Loading />;
  }
  if (questions.length > 0) {
    return <Quiz questions={questions} />;
  }
  return (
    <section className="quiz-setup">
      <form className="form">
        <h2>Quiz Configuration</h2>
        <div className="form-control">
          <label htmlFor="amount">Set the number of questions</label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={quiz.amount}
            onChange={handleChange}
            className="form-input"
            min={1}
            max={30}
          />
        </div>
        <div className="form-control">
          <label htmlFor="category">Select category</label>
          <select
            name="category"
            id="category"
            className="form-input"
            value={quiz.category}
            onChange={handleChange}
          >
            <option value="geography">Geography</option>
            <option value="sports">Sports</option>
            <option value="history">History</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="difficulty">Select difficulty</label>
          <select
            name="difficulty"
            id="difficulty"
            className="form-input"
            value={quiz.difficulty}
            onChange={handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="type">Select type</label>
          <select
            name="type"
            id="type"
            className="form-input"
            value={quiz.type}
            onChange={handleChange}
          >
            <option value="multiple">Multiple</option>
          </select>
        </div>
        {error && (
          <p className="error">Something went wrong. Please change options.</p>
        )}
        <button type="submit" onClick={handleSubmit} className="form-btn">
          Start
        </button>
      </form>
    </section>
  );
};

export default SetupQuiz;
