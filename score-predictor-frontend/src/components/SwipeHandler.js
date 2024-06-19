import React, { useRef, useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const SwipeHandler = () => {
  console.log('SwipeHandler component rendered'); // Basic test log

  const location = useLocation();
  const [direction, setDirection] = useState('forward');
  const prevLocation = useRef(location);

  useEffect(() => {
    console.log('Location changed:', location); // Log location change
    const from = prevLocation.current.pathname;
    const to = location.pathname;

    if ((from === '/' && to === '/Survey') || (from === '/Survey' && to === '/Results')) {
      setDirection('forward');
      console.log('Direction set to forward'); // Log direction
    } else if ((from === '/Results' && to === '/Survey') || (from === '/Survey' && to === '/')) {
      setDirection('backward');
      console.log('Direction set to backward'); // Log direction
    }

    prevLocation.current = location;
  }, [location]);

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        classNames={direction === 'forward' ? 'swipe-right' : 'swipe-left'}
        timeout={300}
      >
        <div className="page">
          <Outlet />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default SwipeHandler;
