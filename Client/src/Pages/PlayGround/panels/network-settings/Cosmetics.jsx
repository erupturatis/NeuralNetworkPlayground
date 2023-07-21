import React from 'react';
import RangeSlider from '../../../../Components/Slider/RangeSlider';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeSetting } from '../../../../store/cosmetics';
import { useState } from 'react';

import arrow from './assets/arrowdown.png';

const Cosmetics = () => {
  const { cosmetics } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [hide, setHide] = useState(true);

  return (
    <div className=" select-none">
      <div className=" select-none  flex justify-center md:justify-start">
        <button
          onClick={() => {
            setHide((e) => !e);
          }}
          className="flex mt-4"
        >
          <img
            src={arrow}
            alt=""
            className={`mt-1 w-5 h-5 transition-transform select-none ${
              hide ? ' -rotate-90' : ''
            }`}
          />
          <div className=" text-lg ml-4 select-none">Network cosmetics</div>
        </button>
      </div>
      <div
        className={` transition-all mb-4 mt-4 ${
          !hide
            ? ' '
            : 'pointer-events-none -translate-y-10 opacity-0 z-0 absolute w-full'
        }`}
      >
        <RangeSlider
          label={`Layer Distance`}
          min={25}
          max={300}
          wval={10}
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
          label={`Neurons Distance`}
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
          label={`Neurons radius`}
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
          label={`Line width`}
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
        <div className="flex justify-center">
          <button
            onClick={() => {
              dispatch(
                changeSetting({
                  label: 'layerDistance',
                  data: 50,
                })
              );
              dispatch(
                changeSetting({
                  label: 'neuronDistance',
                  data: 40,
                })
              );
              dispatch(
                changeSetting({
                  label: 'radius',
                  data: 10,
                })
              );
              dispatch(
                changeSetting({
                  label: 'strokeWConnections',
                  data: 10 / 10,
                })
              );
            }}
            className="select-none text-center opacity-25 mt-4 font-light hover:opacity-100 hover:font-normal transition "
          >
            Reset settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cosmetics;
