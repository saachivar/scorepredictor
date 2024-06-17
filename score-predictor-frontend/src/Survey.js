import React from 'react';
import Question from "./components/Question.js";
import { useState } from 'react';

export default function Survey () {
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
    }
  };

  return (
    <div>
      {questions[currentQuestion]}
      <div>
        <button onClick={previousQuestion} disabled={currentQuestion === 0}>
          Back
        </button>
        <button onClick={nextQuestion} disabled={currentQuestion === questions.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};


  