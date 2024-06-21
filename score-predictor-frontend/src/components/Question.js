import React from 'react';

export default function Question({ question, answers, name, selectedAnswer, onAnswerChange }) {
  return (
    <div className="question">
      <h1 style={{ paddingBottom: '10px' }}>{question}</h1>
      <h2>
        <ul>
          {answers.map((answer, index) => (
            <li key={index} style={{ listStyleType: 'none', marginBottom: '10px' }}>
              <label style={{ fontSize: '45px', paddingBottom: '5px' }}>
                <input 
                  type="radio" 
                  name={name} 
                  value={answer} 
                  checked={selectedAnswer === answer}
                  onChange={() => onAnswerChange(name, answer)}
                />
                <span>{answer}</span>
              </label>
            </li>
          ))}
        </ul>
      </h2>
    </div>
  );
}
