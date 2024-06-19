import React, { useRef, useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const SwipeHandler = () => {
  const location = useLocation();
  const [direction, setDirection] = useState('forward');
  const prevLocation = useRef(location);

  useEffect(() => {
    const from = prevLocation.current.pathname;
    const to = location.pathname;

    if ((from === '/' && to === '/Survey') || (from === '/Survey' && to === '/Results')) {
      setDirection('backward');
    } else if ((from === '/Results' && to === '/Survey') || (from === '/Survey' && to === '/')) {
      setDirection('forward');
    }

    // Update the previous location reference
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
