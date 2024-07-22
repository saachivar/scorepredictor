import { px } from "framer-motion";
import "./images/right-arrow.png"
import { Link } from 'react-router-dom';


export default function Home() {

  return (
        <div className='Home'>
          <div className='Intro'>
            <div className='Welcome'>
              <h1 style={{marginBottom: '40px'}}>Welcome to the SAT score predictor*. </h1>
            </div>
            <div className='Desc'>
              <Link className='h2 nav-link' to="/Survey">Begin the survey
                <div id='home-arrow' >
                  <img src={ require ("./images/right-arrow.png") } alt="Description of Image" className="styled-image"/> 
                </div>
              </Link>
            </div>
          </div>
          <div className='Disclaimer'>
            <p>
              *All data used in this project is from https://www.kaggle.com/datasets/desalegngeb/students-exam-scores/,
              a database with fictional data purely meant for education. This website does not claim to accurately
                predict scores in the real world, and is instead to be used to demonstrate how data can use trends to
                 make predictions. 
            </p>
          </div>
        </div>

  );
}