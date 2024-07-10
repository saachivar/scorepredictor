import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const SwipeHandler = () => {
  const location = useLocation();

  return (
    <div>
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames="swipe-right"  // Always use swipe-right for forward swipe
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
