import React from 'react';
import Question from "./components/Question.js";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./images/right-arrow.png";
import "./images/left-arrow.png";


export default function Survey () {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    <Question question={"What is your gender?"} answers={["male", "female"]}/>,
    <Question question={"How much education did your parents get?"} answers={["high school", "college", "big boy phd"]}/>,
  ]

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate('/')
    }
  };

  return (
    <div className="survey-container">
      <div className="question-container">
        {questions[currentQuestion]}
      </div>
      <div className="button-container">
        <button onClick={previousQuestion} className="survey-arrow survey-left">
          <img src={ require ("./images/left-arrow.png") } alt="back" />
        </button>
        <button onClick={nextQuestion} className="survey-arrow survey-right" disabled={currentQuestion === questions.length - 1}>
          <img src={ require ("./images/right-arrow.png") } alt="next" />
        </button>
      </div>
    </div>
  );
};
