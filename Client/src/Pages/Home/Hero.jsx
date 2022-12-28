import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NeuronPainter } from './HeroNeurons';
import './Hero.css';
const Hero = () => {
  const [painter, setPainter] = useState(new NeuronPainter());
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    painter.parametrize(setFrame);
    painter.start();

    return () => {
      painter.destroy();
    };
  }, []);

  let showFrame = () => {
    console.log('show', painter.frame);
  };

  return (
    <div className="border-2 relative bg-transparent">
      <div className="w-full flex justify-center items-center bg-transparent">
        <div>
          <button onClick={showFrame}>clickme</button>
          <div className="backgroundGoo absolute border-2"></div>
          <div className="text-center heroText  mt-48">
            Play with neural networks right
            <br /> here in your browser
          </div>
          <div className="flex justify-center">
            {' '}
            <div className="text-center w-96 border-2 mt-48">
              neural networks and deep learning have been a hot topic for the
              last few years. Take the chance now to visualize neural networks
              and interactively tinker with its insides for free
            </div>
          </div>
          <div className="h-96" />
        </div>
      </div>
      <div className="absolute w-full  h-full top-0 mask1">
        <svg
          id="root-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          className="absolute top-0 -z-10"
        >
          <g id="root-group2"></g>
          <g id="root-group"></g>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
