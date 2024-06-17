export default function Question({ question, answers}) {
  return (
    <div className="question">
        <h1>{question}</h1>
        <h2>
            <ul>
                {answers.map((answer, index) => (
                    <li key={index}>{answer}</li>
                ))}
            </ul>
        </h2>
    </div>
  );
}

