import React, { useRef, useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const SwipeHandler = () => {
  const location = useLocation();
  const [direction, setDirection] = useState('forward');
  const directionRef = useRef('forward');
  const prevLocation = useRef(location);

  useEffect(() => {
    const from = prevLocation.current.pathname;
    const to = location.pathname;

    let newDirection = 'forward';
    if ((from === '/' && to === '/Survey') || (from === '/Survey' && to === '/Results')) {
      newDirection = 'backward';
    } else if ((from === '/Results' && to === '/Survey') || (from === '/Survey' && to === '/')) {
      newDirection = 'forward';
    }

    // Update the direction ref and state
    directionRef.current = newDirection;
    setDirection(newDirection);

    // Update the previous location reference
    prevLocation.current = location;
  }, [location]);

  return (
    <div>
      <div>Current Direction: {directionRef.current}</div>
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames={directionRef.current === 'forward' ? 'swipe-right' : 'swipe-left'}
          timeout={300}
        >
          <div className="page">
            <Outlet />
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default SwipeHandler;
