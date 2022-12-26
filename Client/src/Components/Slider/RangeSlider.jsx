import React from 'react';
import './slider.css';

const RangeSlider = ({ valueTracker, setValue, label, min, max, step }) => {
  return (
    <div className=" flex  items-center mb-1 justify-between">
      <div className="text-sm opacity-60 w-10 text-center select-none">
        {label}
      </div>
      <div className="w-40">
        <input
          id="range"
          type="range"
          min={min}
          max={max}
          value={valueTracker}
          style={{
            background: `linear-gradient(90deg, rgba(74,95,170,1) 0%, rgba(74,95,170,1) ${
              (valueTracker / max) * 100
            }%, rgba(27,41,69,1) ${
              (valueTracker / max) * 100
            }%, rgba(27,41,69,1) 100%)`,
          }}
          className="w-full h-2  bg-[#1B2945] rounded-lg appearance-none cursor-pointer slider"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
      <div className="w-10 opacity-60 text-center mr-3 select-none">
        {valueTracker}
      </div>
    </div>
  );
};

export default RangeSlider;
