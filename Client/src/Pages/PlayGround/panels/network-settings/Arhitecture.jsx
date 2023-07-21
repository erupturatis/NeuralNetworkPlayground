import React from 'react';
import arrow from './assets/arrowdown.png';
import { useState} from 'react';
import RangeSlider from '../../../../Components/Slider/RangeSlider';
import { useArchitecture } from '../../operations/useArhitecture.jsx';

const Arhitecture = () => {
  const {
    network,
    layers,
    layerSizes,
    setLayers,
    setMultipleLayerSizes,
    setLayerSizeFactory,
  } = useArchitecture();
  const [hide, setHide] = useState(true);

  return (
    <div>
      <div className="z-10 select-none  flex justify-center md:justify-start">
        <button
          onClick={() => {
            setHide((e) => !e);
          }}
          className="flex"
        >
          <img
            src={arrow}
            alt=""
            className={`mt-1 w-5 h-5 transition-transform ${
              hide ? ' -rotate-90' : ''
            }`}
          />
          <div className=" text-lg ml-4 select-none">Network architecture</div>
        </button>
      </div>

      <div
        className={` transition-all mb-4 ${
          !hide
            ? ' '
            : 'pointer-events-none -translate-y-10 opacity-0 z-0 absolute w-full'
        }`}
      >
        <div className="select-none opacity-70 flex justify-center mb-2 mt-2">
          Layers {layers}
        </div>
        <div className="mb-2">
          <input
            id="range"
            type="range"
            min="2"
            max="20"
            value={layers}
            style={{
              background: `linear-gradient(90deg, rgba(74,95,170,1) 0%, rgba(74,95,170,1) ${
                ((layers - 2) / 18) * 100
              }%, rgba(27,41,69,1) ${
                ((layers - 2) / 18) * 100
              }%, rgba(27,41,69,1) 100%)`,
            }}
            className="w-full h-3 mb-10  bg-[#1B2945] rounded-lg appearance-none cursor-pointer slider"
            onChange={(e) => {
              setLayers(e.target.value);
            }}
          />
          <div className="flex justify-between mb-4 text-lg">
            <div className="opacity-70 select-none">Layer</div>
            <div className="opacity-70 select-none">neurons</div>
          </div>
          {network.layers.map((element) => {
            return (
              <RangeSlider
                label={`${element.layerNum} `}
                min={1}
                max={25}
                key={`${element.layerNum}`}
                element={element}
                valueTracker={layerSizes[element.layerNum]}
                setValue={setLayerSizeFactory(element.layerNum)}
              />
            );
          })}
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => {
              setLayers(3);
              setMultipleLayerSizes(
                { index: 0, value: 2 },
                { index: 1, value: 5 }
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

export default Arhitecture;
