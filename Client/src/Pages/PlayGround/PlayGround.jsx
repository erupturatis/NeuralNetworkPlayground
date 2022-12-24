import { useEffect } from 'react';
import NetworkGenerator from './NetworkGenerator';
import OptionsLeft from './OptionsPanels/Left/OptionsLeft';
import OptionsTop from './OptionsPanels/Top/OptionsTop';
import OptionsRight from './OptionsPanels/Right/OptionsRight';

const PlayGround = () => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div id="graph-container" className="w-full h-full relative">
      <div className=" text-white left-0 absolute h-full  w-72 m-6 ">
        <OptionsLeft />
      </div>
      <div className=" text-white left-80 absolute h-48 w-full border-2 ">
        <OptionsTop />
      </div>
      <div className=" text-white right-0 absolute w-64 h-full border-2 ">
        <OptionsRight />
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
