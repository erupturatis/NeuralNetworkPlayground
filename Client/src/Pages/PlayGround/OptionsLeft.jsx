import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  dispatchAddLayer,
  dispatchAddNeuron,
  dispatchRemoveLayer,
  dispatchRemoveNeuron,
} from './utils/dispatchers';
import { setDispatch } from './utils/dispatchers';

const OptionsLeft = () => {
  const { network } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [layers, setLayers] = useState(network.length);
  const [layerSizes, setLayerSizes] = useState(
    network.layers.map((element) => element.numNeurons)
  );

  useEffect(() => {
    setDispatch(dispatch);
  }, []);

  useEffect(() => {
    for (let i = 0; i < network.length; i++) {
      if (layerSizes[i] > network.layers[i].numNeurons) {
        for (
          let iter = layerSizes[i] - network.layers[i].numNeurons;
          iter > 0;
          iter--
        ) {
          dispatchAddNeuron(i);
        }
      } else if (layerSizes[i] < network.layers[i].numNeurons) {
        for (
          let iter = network.layers[i].numNeurons - layerSizes[i];
          iter > 0;
          iter--
        ) {
          dispatchRemoveNeuron(i);
        }
      }
    }
  }, [layerSizes]);

  useEffect(() => {
    syncLayers();
  }, [layers]);

  useEffect(() => {
    setLayers(network.length);
  }, [network.length]);

  let setlayerSizesIdx = (index, value) => {
    value = parseInt(value);
    let newSizes = [...layerSizes];
    newSizes.splice(index, 1, value);
    setLayerSizes(newSizes);
  };

  let syncLayers = () => {
    // layers sync
    if (layers > network.length) {
      // need to add layers
      for (let iter = layers - network.length; iter > 0; iter--) {
        dispatchAddLayer(network.length - 2);
      }
    } else if (layers < network.length) {
      for (let iter = network.length - layers; iter > 0; iter--) {
        dispatchRemoveLayer(layers - 1);
      }
    }
  };
  return (
    <div className="h-  ">
      <div>Layers {layers}</div>
      <div className="h-72 overflow-auto">
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
            <>
              <div>
                Layer {element.layerNum} with {element.numNeurons} neurons
              </div>
              <input
                key={element.layerNum}
                id="range"
                type="range"
                min="1"
                max="25"
                value={layerSizes[element.layerNum]}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                onChange={(e) => {
                  setlayerSizesIdx(element.layerNum, e.target.value);
                }}
              />
            </>
          );
        })}
      </div>
      <div className="border-2 h-full bg-amber-300  overflow-hidden"></div>
    </div>
  );
};

export default OptionsLeft;
