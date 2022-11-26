import React, { useState } from 'react';
import NetworkGenerator from './NetworkGenerator';

import { dispatchAddNeuron } from './utils/dispatchers';

const PlayGround = () => {
  return (
    <div id="graph-container" className="w-screen h-screen pr-56 pt-40">
      <button
        onClick={() => dispatchAddNeuron(1)}
        className="text-white bg-black"
      >
        Add neuron
      </button>

      <div className="w-full h-full border-2">
        <svg
          id="root-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <NetworkGenerator />
        </svg>
      </div>
    </div>
  );
};

export default PlayGround;
