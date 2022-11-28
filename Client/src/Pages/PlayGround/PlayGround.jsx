import NetworkGenerator from './NetworkGenerator';
import OptionsLeft from './OptionsLeft';

const PlayGround = () => {
  return (
    <div id="graph-container" className="w-full h-full ">
      <div className=" text-white left-0 absolute h-100% w-96 border-2">
        <OptionsLeft />
      </div>
      <div className="w-full h-full ">
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
