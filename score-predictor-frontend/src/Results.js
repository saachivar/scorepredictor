import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation} from 'react-router-dom';

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  // Extract the predicted scores and feature importances from the location state
  const { scores, importances } = location.state || {};
  console.log(scores)

  // If scores or importances are not available, redirect back to the survey
  if (!(scores && importances)) {
    navigate('/');
    return null;
  }



  return (
    <div className='Results'>
      <h1>Results</h1>
      <div className="scores">
        Score 1: {scores[0]} Score 2: {scores[1]}
      </div>
      <h1>Feature Importances</h1>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Importance</th>
          </tr>
        </thead>
        <tbody>
          {importances.map((importance, index) => (
            <tr key={index}>
              <td>{importance.Feature}</td>
              <td>{importance.Importance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className='nav-link' to="/">Begin the survey</Link>
    </div>
  )
};


