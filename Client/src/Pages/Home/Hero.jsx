import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NeuronPainter } from './NeuronPainters';
import './Hero.css';
const Hero = () => {
  const [painter, setPainter] = useState(new NeuronPainter('root-group-hero'));
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    painter.start();

    return () => {
      painter.destroy();
    };
  }, []);

  let showFrame = () => {
    console.log('show', painter.frame);
  };

  return (
    <div className="relative bg-transparent">
      <div className="w-full flex justify-center items-center bg-transparent">
        <div className="mt-8">
          <div className=" z-10  relative mt-44">
            <div className="text-center heroText  relative z-10 select-none">
              Play with neural networks right
              <br /> here in your browser
            </div>
            <div className="flex justify-center ">
              <div
                className="text-center mt-6 text-[#B0ECFF] opacity-75 text-lg select-none"
                style={{
                  width: '35rem',
                }}
              >
                Neural networks and deep learning have been a hot topic for the
                last few years. Take the chance now to visualize neural networks
                and interactively tinker with their insides for free
              </div>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="backgroundGoo2 absolute -top-40 ">rsg</div>
            <div className="backgroundGoo absolute -top-60 ">rsg</div>
          </div>

          <div className="h-24" />
        </div>
      </div>
      <div className="absolute w-full h-full top-0 mask1">
        <svg
          id="root-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          className="absolute top-0 -z-10"
        >
          <g id="root-group-hero-conn"></g>
          <g id="root-group-hero"></g>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
