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
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default RangeSlider;
