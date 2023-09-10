import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

const defaults = {
  
  color: 'white',
  size: 100,
  animate: true
};

const Animation = (props) => (
  <ReactAnimatedWeather
    icon={props.icon}
    color={defaults.color}
    size={defaults.size}
    animate={defaults.animate}
  />
);

export default Animation;