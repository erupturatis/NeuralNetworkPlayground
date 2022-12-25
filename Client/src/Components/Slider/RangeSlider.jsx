import React from 'react';

const RangeSlider = ({ valueTracker, setValue, label, min, max, step }) => {
  return (
    <div>
      <div>{label}</div>
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
        className="w-full h-2 bg-[#1B2945] rounded-lg appearance-none cursor-pointer"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default RangeSlider;
