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
      <div className="z-10">
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
          <div className=" text-lg ml-4">Network arhitecture</div>
        </button>
      </div>

      <div
        className={` transition-all mb-4 ${
          !display
            ? ' '
            : 'pointer-events-none -translate-y-10 opacity-0 z-0 absolute w-full'
        }`}
      >
        <div>Layers {layers}</div>
        <div className="">
          <input
            id="range"
            type="range"
            min="2"
            max="20"
            value={layers}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            onChange={(e) => {
              setLayers(e.target.value);
            }}
          />
          {network.layers.map((element) => {
            return (
              <RangeSlider
                label={`Layer ${element.layerNum} with ${element.numNeurons} neurons`}
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
      </div>
    </div>
  );
};

export default Arhitecture;
