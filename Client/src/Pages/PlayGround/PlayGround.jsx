import { useEffect } from 'react';
import NetworkGenerator from './NetworkGenerator';
import OptionsLeft from './OptionsLeft';
import OptionsTop from './OptionsTop';
import { mode } from 'd3';

const PlayGround = () => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div id="graph-container" className="w-full h-full ">
      <div className=" text-white left-0 absolute h-full  w-64 border-2 ">
        <OptionsLeft />
      </div>
      <div className=" text-white left-64 absolute h-48  w-full border-2 ">
        <OptionsTop />
      </div>
      <div className="w-full h-full">
        <svg
          id="root-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <g id="root-group">
            <NetworkGenerator />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default PlayGround;
