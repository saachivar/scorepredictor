import React, { useRef, useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


const SwipeHandler = () => {
  const location = useLocation();
  const [direction, setDirection] = useState('forward');
  const prevLocation = useRef(location);

  useEffect(() => {
    if (
      (prevLocation.current.pathname === '/Survey' && location.pathname === '/') ||
      (prevLocation.current.pathname === '/Results' && location.pathname === '/Survey')
    ) {
      setDirection('forward');
    } else if (prevLocation.current.pathname === '/' && location.pathname === '/Survey'){
      setDirection('backward');
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
