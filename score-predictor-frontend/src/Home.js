import "./images/right-arrow.png"
import { Link } from 'react-router-dom';


export default function Home() {

  return (
        <div className='Home'>
          <div className='Intro'>
            <h1>Welcome to the SAT score predictor*. </h1>
            <Link className='h2 nav-link' to="/Survey">Begin the survey
              <div id='home-arrow' >
                <img src={ require ("./images/right-arrow.png") } alt="Description of Image" class="styled-image"/> 
              </div>
            </Link>
          </div>
          <div className='Disclaimer'>
            <p>
              *All data used in this project is from https://www.kaggle.com/datasets/desalegngeb/students-exam-scores/,
              a database with fictional data purely meant for education. This website does not claim to accurately
                predict scores in the real world, and is instead to be used to demonstrate how data can display trends 
                and make predictions. 
            </p>
          </div>
        </div>

  );
}