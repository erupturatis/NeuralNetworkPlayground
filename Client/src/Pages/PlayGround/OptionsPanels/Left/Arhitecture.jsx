import React from 'react';
import arrow from './assets/arrowdown.png';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RangeSlider from '../../../../Components/Slider/RangeSlider';
import { useDispatch } from 'react-redux';
import {
  addNeuron,
  removeLayer,
  removeNeuron,
  addLayer,
} from '../../../../store/network';

const Arhitecture = () => {
  const dispatch = useDispatch();
  const { network } = useSelector((state) => state);
  const [layers, setLayers] = useState(network.length);
  const [layerSizes, setLayerSizes] = useState(
    network.layers.map((element) => element.numNeurons)
  );
  const [display, setDisplay] = useState(false);

  let setlayerSizesIdx = (index, value) => {
    value = parseInt(value);
    let newSizes = [...layerSizes];
    newSizes.splice(index, 1, value);
    setLayerSizes(newSizes);
  };

  let setMultipleLayerSizes = (...args) => {
    let newSizes = [...layerSizes];

    args.forEach((element) => {
      const { index, value } = element;
      newSizes.splice(index, 1, value);
    });
    setLayerSizes(newSizes);
  };

  let setLayerSizeFactory = (index) => {
    return (value) => {
      setlayerSizesIdx(index, value);
    };
  };

  let syncLayers = () => {
    // layers sync
    if (layers > network.length) {
      // need to add layers
      for (let iter = layers - network.length; iter > 0; iter--) {
        dispatch(addLayer(network.length - 2));
      }
    } else if (layers < network.length) {
      for (let iter = network.length - layers; iter > 0; iter--) {
        dispatch(removeLayer(layers - 1));
      }
    }
  };
  useEffect(() => {
    setLayers(network.length);
  }, [network.length]);

  useEffect(() => {
    setLayerSizes(network.layers.map((element) => element.numNeurons));
  }, [network.layers]);

  useEffect(() => {
    syncLayers();
  }, [layers]);

  useEffect(() => {
    for (let i = 0; i < network.length; i++) {
      if (layerSizes[i] > network.layers[i].numNeurons) {
        for (
          let iter = layerSizes[i] - network.layers[i].numNeurons;
          iter > 0;
          iter--
        ) {
          dispatch(addNeuron(i));
        }
      } else if (layerSizes[i] < network.layers[i].numNeurons) {
        for (
          let iter = network.layers[i].numNeurons - layerSizes[i];
          iter > 0;
          iter--
        ) {
          dispatch(removeNeuron(i));
        }
      }
    }
    //
  }, [layerSizes]);

  return (
    <div>
      <div className="z-10 select-none">
        <button
          onClick={() => {
            setDisplay((e) => !e);
          }}
          className="flex"
        >
          <img
            src={arrow}
            alt=""
            className={`mt-1 w-5 h-5 transition-transform ${
              display ? ' -rotate-90' : ''
            }`}
          />
          <div className=" text-lg ml-4 select-none">Network arhitecture</div>
        </button>
      </div>

      <div
        className={` transition-all mb-4 ${
          !display
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
