import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation} from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';

function Number ({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 500,
    config: {  mass: 1, tension: 170, friction: 50 },
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
}

export default function Results() {

  const navigate = useNavigate();
  const location = useLocation();
  // Extract the predicted scores and feature importances from the location state
  const { scores, importances } = location.state || {};
  console.log(importances)
 

  // If scores or importances are not available, redirect back to the survey
  if (!(scores && importances)) {
    navigate('/');
    return null;
  }

  const flatScores = scores.flat()

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
      <div className = 'resultTitle'>
        <h1>Results</h1>
      </div>
      <div className="scores">
        <div className="scoreGrid">
          <div className="score">
            <div className = "wholeNum">
              <Number n={flatScores[0]+flatScores[1]} />   
            </div>
            <div className = "wholeDesc">
              Predicted Total Score
            </div>
          </div>
          <div className="score">
            <div className = "halfNum">
              <Number n={flatScores[0]} /> 
            </div>
            <div className = "halfDesc">
              Predicted Math Score
            </div>
          </div>
          <div className="score">
            <div className = "halfNum">
              <Number n={flatScores[1]} /> 
            </div>
            <div className = "halfDesc">
              Predicted Reading Score
            </div>
          </div>
        </div>  
      </div>
      <div className="Why">
        <h2>Why?</h2>
      </div>
      <div className="explanation"> 
        These are the features that had the most impact towards your predicted score.
      </div>
      <div className="featuresList">
        {readableFeatures.map((importance, index) => (
          <dl key={index}>
            <dd>{importance.Feature}</dd>
          </dl>
        ))}
      </div>
      <Link className='navLink' to="/">Go back to the beginning --{'>'}</Link>
    </div>
  )
};


