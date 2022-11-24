import React, { useState } from 'react';
import NetworkGenerator from './NetworkGenerator';

const PlayGround = () => {
  return (
    <div id="graph-container" className="w-screen h-screen p-40">
      <svg
        id="root-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <NetworkGenerator />
      </svg>
    </div>
  );
};

export default PlayGround;
