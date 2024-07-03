import React, { useState } from 'react';
import SwipeHandler from './SwipeHandler';

const Swiper = () => {
  const [swipeDirection, setSwipeDirection] = useState('forward');

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
  };

  return (
    <div>
      <SwipeButtons onSwipe={handleSwipe} />
      <SwipeHandler direction={swipeDirection} />
    </div>
  );
};

export default Swiper;
