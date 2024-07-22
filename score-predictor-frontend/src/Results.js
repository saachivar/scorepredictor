import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation} from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';

function Number ({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 20, duration: 2000 },
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
}

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

  const flatScores = scores.flat()
  console.log(flatScores)
  flatScores[0] = Math.ceil(flatScores[0] / 10) * 10;
  flatScores[1] = Math.ceil(flatScores[1] / 10) * 10;

  const consolidateAndGetTopFeatures = (data, topN) => {
    const consolidated = [];
    const seenFeatures = new Set();
  
    for (const item of data) {
      const baseFeature = item.Feature.split('_')[0];
  
      if (!seenFeatures.has(baseFeature)) {
        item.Feature = baseFeature;
        consolidated.push(item);
        seenFeatures.add(baseFeature);
      }
  
      if (consolidated.length === topN) {
        break;
      }
    }
    console.log(consolidated)
    return consolidated;
  };
  
  const topFeatures = consolidateAndGetTopFeatures(importances, 3);

  const getReadableFeatures = (features) => {
    const featureMap = {
      'NrSiblings': 'Number of siblings',
      'LunchType': 'Lunch type',
      'Gender': 'Gender',
      'ParentEduc': 'Parent education',
      'TestPrep': 'Test preparation',
      'ParentMaritalStatus': 'Parent marital status',
      'PracticeSport': 'Practice sport',
      'IsFirstChild': 'First child status',
      'TransportMeans': 'Transport means',
      'WklyStudyHours': 'Weekly study hours'
    };
  
    return features.map(feature => ({
      ...feature,
      Feature: featureMap[feature.Feature] || feature.Feature
    }));
  };
  
  const readableFeatures = getReadableFeatures(topFeatures);





  return (
    <div className='Results'>
      <h1>Results</h1>
      <div className="scores">
        <div className="scoreGrid">
          <div className="score">
            <div className = "wholeNum">
              <Number n={flatScores[0]+flatScores[1]} />   
            </div>
            <div className = "wholeDesc">
              Total Score
            </div>
          </div>
          <div className="score">
            <div className = "halfNum">
              <Number n={flatScores[0]} /> 
            </div>
            <div className = "halfDesc">
              Math Score
            </div>
          </div>
          <div className="score">
            <div className = "halfNum">
              <Number n={flatScores[1]} /> 
            </div>
            <div className = "halfDesc">
              Reading Score
            </div>
          </div>
        </div>  
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
          {readableFeatures.map((importance, index) => (
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


