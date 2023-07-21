import { useEffect } from 'react';
import { useRef } from 'react';
import NetworkGenerator from './NetworkGenerator';
import OptionsLeft from './OptionsPanels/Left/OptionsLeft';
import OptionsTop from './OptionsPanels/Top/OptionsTop';
import OptionsRight from './OptionsPanels/Right/OptionsRight';
import './playground.css';
const PlayGround = () => {
  const leftRef= useRef(null);
  useEffect(() => {
    document.getElementById('rootApp').scrollTo(0, 0);
    document.getElementById('rootApp').classList.add('overflow-hidden');
    return () => {
      document.getElementById('rootApp').classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div id="graph-container" className="w-full h-full relative">
      <button onClick={()=>{
        leftRef.current.classList.toggle('left-[-100%]')
      }} className={'w-7 h-7 absolute left-5 top-6 block lg:hidden'}>
        <img src={'optionsWheel.png'} className={'w-full h-full '} />
      </button>
      <div ref={leftRef} className="text-white transition-all duration-300 left-0 absolute mt-16 z-20 bg-bgdefault md:bg-transparent md:z-0 md:m-6 h-full w-full md:w-80">
        <OptionsLeft />
      </div>
      <div className=" top-0 sm:top-6 text-white absolute h-48 left-0 right-0 hidden lg:block sm:left-80 sm:right-60   ">
        <OptionsTop />
      </div>

      <div className=" text-white hidden lg:block right-0 absolute w-64 h-full ">
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
