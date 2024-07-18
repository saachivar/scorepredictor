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
    { question: "1. What is your gender?", answers: ["male", "female"], name: "gender" },
    { question: "2. What is your parents' education level?", answers: ["bachelor's degree", "some college", "master's degree", "associate's degree", "high school"], name: "parentsEducation" },
    { question: "3. What is your lunch type?", answers: ["free/reduced", "standard"], name: "lunchType" },
    { question: "4. Have you completed any test prep?", answers: ["yes", "no"], name: "testPrep" },
    { question: "5. What is your parent's marital status?", answers: ["married", "divorced", "widowed"], name: "maritalStatus" },
    { question: "6. Do you practice a sport?", answers: ["regularly", "sometimes", "never"], name: "sportPractice" },
    { question: "7. Are you a first child?", answers: ["yes", "no"], name: "firstChild" },
    { question: "8. How many siblings do you have?", answers: ["0", "1", "2", "3+"], name: "siblings" },
    { question: "9. How do you get to school?", answers: ["school bus", "privately"], name: "schoolTransport" },
    { question: "10. How many hours a week do you study?", answers: ["< 5", "5 - 10", "> 10"], name: "studyHours" },
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

  const sendAnswersToBackend = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });
      const data = await response.json();
      // Handle the response data as needed
      console.log('Predicted Scores:', data.predicted_scores);
      console.log('Feature Importances:', data.feature_importances);
      navigate('/Results', { state: { scores: data.predicted_scores, importances: data.feature_importances } });
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
    navigate('/Results')
  }

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
