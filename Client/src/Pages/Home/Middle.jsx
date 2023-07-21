import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { MiddlePainter } from './NeuronPainters';

import './gradients.css';

const Middle = () => {
  const [painter, setPainter] = useState(
    new MiddlePainter('root-group-middle')
  );

  useEffect(() => {
    painter.start();
    return () => {
      painter.destroy();
    };
  }, []);
  return (
    <div className="  w-full relative ">
      <svg
        id="root-svg-middle"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        className="absolute -top-20 -z-10 "
      >
        <g id="root-group-middle"></g>
        <g id="root-group-middle-conn"></g>
      </svg>
      <div className="h-96 "></div>
      <div className="h-96" />
      <div className="flex justify-center items-center w-full">
        <div className=" flex justify-center items-center h-full">
          <div className="w-96 -mt-20  MiddleFirst text-lg lg:text-2xl font-medium text-center">
            With the rising interest for AI and
            <div className="font-bold">Deep Learning</div>
            <div className="flex justify-center">
              <div className="font-normal text-base lg:text-lg mt-7 w-5/6 text-center">
                I wanted to create an interactive way of running neural networks
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Middle;
