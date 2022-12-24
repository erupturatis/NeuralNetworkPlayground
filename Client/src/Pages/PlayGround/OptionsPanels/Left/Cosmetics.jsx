import React from 'react';
import RangeSlider from '../../../../Components/RangeSlider';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeSetting } from '../../../../store/cosmetics';
import { useState } from 'react';

import arrow from './assets/arrowdown.png';

const Cosmetics = () => {
  const { cosmetics } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(true);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setDisplay((e) => !e);
          }}
          className="flex mt-4"
        >
          <img
            src={arrow}
            alt=""
            className={`mt-1 w-5 h-5 transition-transform ${
              display ? ' -rotate-90' : ''
            }`}
          />
          <div className=" text-lg ml-4 ">Network cosmetics</div>
        </button>
      </div>
      <div
        className={` transition-all mb-4 ${
          !display
            ? ' '
            : 'pointer-events-none -translate-y-10 opacity-0 z-0 absolute w-full'
        }`}
      >
        <RangeSlider
          label={`Layer Distance ${cosmetics.layerDistance}`}
          min={25}
          max={300}
          valueTracker={cosmetics.layerDistance}
          setValue={(value) => {
            dispatch(
              changeSetting({
                label: 'layerDistance',
                data: value,
              })
            );
          }}
        />
        <RangeSlider
          label={`Neurons Distance ${cosmetics.neuronDistance}`}
          min={10}
          max={200}
          valueTracker={cosmetics.neuronDistance}
          setValue={(value) => {
            dispatch(
              changeSetting({
                label: 'neuronDistance',
                data: value,
              })
            );
          }}
        />
        <RangeSlider
          label={`Neurons radius ${cosmetics.radius}`}
          min={5}
          max={20}
          valueTracker={cosmetics.radius}
          setValue={(value) => {
            dispatch(
              changeSetting({
                label: 'radius',
                data: value,
              })
            );
          }}
        />
        <RangeSlider
          label={`Line width ${cosmetics.strokeWConnections * 10}`}
          min={5}
          max={20}
          valueTracker={cosmetics.strokeWConnections * 10}
          setValue={(value) => {
            dispatch(
              changeSetting({
                label: 'strokeWConnections',
                data: value / 10,
              })
            );
          }}
        />
      </div>
    </div>
  );
};

export default Cosmetics;
