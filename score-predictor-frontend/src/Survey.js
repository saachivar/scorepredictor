import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from "./components/Question";
import "./images/right-arrow.png";
import "./images/left-arrow.png";


export default function Survey() {
 
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    { question: "What is your gender?", answers: ["male", "female"], name: "gender" },
    { question: "What is your parents' education level?", answers: ["bachelor's degree", "some college", "master's degree", "associate's degree", "high school"], name: "parentsEducation" },
    { question: "What is your lunch type?", answers: ["free/reduced", "standard"], name: "lunchType" },
    { question: "Have you completed any test prep?", answers: ["yes", "no"], name: "testPrep" },
    { question: "What is your parent's marital status?", answers: ["married", "divorced", "widowed"], name: "maritalStatus" },
    { question: "Do you practice a sport?", answers: ["regularly", "sometimes", "never"], name: "sportPractice" },
    { question: "Are you a first child?", answers: ["yes", "no"], name: "firstChild" },
    { question: "How many siblings do you have?", answers: ["0", "1", "2", "3+"], name: "siblings" },
    { question: "How do you get to school?", answers: ["school bus", "privately"], name: "schoolTransport" },
    { question: "How many hours a week do you study?", answers: ["< 5", "5 - 10", "> 10"], name: "studyHours" },
  ];

  const handleAnswerChange = (name, answer) => {
    setAnswers({
      ...answers,
      [name]: answer,
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/Results')
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate('/');
    }
  };

   // Calculate percentage width for top-line
   const topLineWidth = ((currentQuestion + 1) / questions.length) * 100 + '%';

  return (
    <div className="survey-container">
      <div className="question-container">
        <Question 
          question={questions[currentQuestion].question} 
          answers={questions[currentQuestion].answers}
          name={questions[currentQuestion].name}
          selectedAnswer={answers[questions[currentQuestion].name] || ""}
          onAnswerChange={handleAnswerChange}
        />
      </div>
      <div className="button-container" >
        <button onClick={previousQuestion} className="survey-arrow survey-left" >
          <img src={require("./images/left-arrow.png")} alt="back" />
        </button>
        <div className="rounded-line">
          <div className="top-line" style={{ width: topLineWidth }}></div>
        </div>
        <button onClick={nextQuestion} className="survey-arrow survey-right">
          <img src={require("./images/right-arrow.png")} alt="next" />
        </button>
      </div>
    </div>
  );
}
