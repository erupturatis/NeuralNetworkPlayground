import { useEffect } from 'react';
import NetworkGenerator from './NetworkGenerator';
import OptionsLeft from './OptionsPanels/Left/OptionsLeft';
import OptionsTop from './OptionsPanels/Top/OptionsTop';
import OptionsRight from './OptionsPanels/Right/OptionsRight';
import './playground.css';
const PlayGround = () => {
  useEffect(() => {
    document.getElementById('rootApp').scrollTo(0, 0);
    document.getElementById('rootApp').classList.add('overflow-hidden');
    return () => {
      document.getElementById('rootApp').classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div id="graph-container" className="w-full h-full relative">
      <div className=" text-white left-0 absolute m-6 h-full w-80  lg:block ">
        <OptionsLeft />
      </div>
      <div className=" top-0 sm:top-6 text-white absolute h-48 left-0 right-0  sm:left-80 sm:right-60   ">
        <OptionsTop />
      </div>

      <div className=" text-white right-0 absolute w-64 h-full ">
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
