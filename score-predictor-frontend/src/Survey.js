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
    <Question question={"What is your gender?"} answers={["male", "female"]} />,
  <Question question={"What is your parents' education level?"} answers={["bachelor's degree", "some college", "master's degree", "associate's degree", "high school"]} />,
  <Question question={"What is your lunch type?"} answers={["free/reduced", "standard"]} />,
  <Question question={"Have you completed any test prep?"} answers={["yes", "no"]} />,
  <Question question={"What is your parent's marital status?"} answers={["married", "divorced", "widowed"]} />,
  <Question question={"Do you practice a sport?"} answers={["regularly", "sometimes", "never"]} />,
  <Question question={"Are you a first child?"} answers={["yes", "no"]} />,
  <Question question={"How many siblings do you have?"} answers={["0", "1", "2", "3+"]} />,
  <Question question={"How do you get to school?"} answers={["school bus", "privately"]} />,
  <Question question={"How many hours a week do you study?"} answers={["< 5", "5 - 10", "> 10"]} />,

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
