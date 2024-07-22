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
    { question: "1. What is your gender?", answers: ["Male", "Female"], name: "Gender" },
    { question: "2. What is your parents' education level?", answers: ["bachelor's degree", "some college", "master's degree", "associate's degree", "high school"], name: "ParentEduc" },
    { question: "3. What is your lunch type?", answers: ["free/reduced", "standard"], name: "LunchType" },
    { question: "4. Have you completed any test prep?", answers: ["yes", "no"], name: "TestPrep" },
    { question: "5. What is your parent's marital status?", answers: ["married", "divorced", "widowed"], name: "ParentMaritalStatus" },
    { question: "6. Do you practice a sport?", answers: ["regularly", "sometimes", "never"], name: "PracticeSport" },
    { question: "7. Are you a first child?", answers: ["yes", "no"], name: "IsFirstChild" },
    { question: "8. How many siblings do you have?", answers: ["0", "1", "2", "3"], name: "NrSiblings" },
    { question: "9. How do you get to school?", answers: ["school bus", "privately"], name: "TransportMeans" },
    { question: "10. How many hours a week do you study?", answers: ["< 5", "5 - 10", "> 10"], name: "WklyStudyHours" },
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
    } else if (areAllQuestionsAnswered()) {
      sendAnswersToBackend();
    } else {
      alert("Please answer all of the questions before submitting.")
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate('/');
    }
  };


  const areAllQuestionsAnswered = () => {
    return questions.every(question => answers[question.name] !== undefined && answers[question.name] !== '');
  };

  const sendAnswersToBackend = () => {
      fetch('http://127.0.0.1:5000/predict', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
      // Handle the response data as needed
      navigate('/Results', { state: { scores: data.predicted_scores, importances: data.feature_importances } });
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });

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