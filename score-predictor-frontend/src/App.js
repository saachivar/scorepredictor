import React from 'react';
import { useRoutes } from 'react-router-dom';
import SwipeHandler from './components/SwipeHandler';
import Home from './Home';
import Survey from './Survey';
import Results from './Results';

const App = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <SwipeHandler />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'Survey', element: <Survey /> },
        { path: 'Results', element: <Results /> }
      ]
    }
  ]);

  return routes;
};

export default App;

