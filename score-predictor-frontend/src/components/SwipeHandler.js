import React from 'react';
import { Outlet } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const SwipeHandler = ({ direction }) => {
  return (
    <div>
      <div>Current Direction: {direction}</div>
      <TransitionGroup>
        <CSSTransition
          key={direction}
          classNames={direction === 'forward' ? 'swipe-right' : 'swipe-left'}
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
