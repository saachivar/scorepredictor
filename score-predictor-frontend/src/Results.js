import React from 'react';
import Home from "./Home"
import { Link } from 'react-router-dom';

export default function Results() {
  return (
    <div className='Results'>
      <h1>Results</h1>
      <Link className='nav-link' to="/">Begin the survey</Link>
    </div>
  )
};


