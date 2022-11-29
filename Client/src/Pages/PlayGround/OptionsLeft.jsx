import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { dispatchAddLayer, dispatchRemoveLayer } from './utils/dispatchers';
const OptionsLeft = () => {
  const [layers, setLayers] = useState(5);
  const { network } = useSelector((state) => state);

  useEffect(() => {
    syncLayers();
  }, [layers]);

  useEffect(() => {
    setLayers(network.length);
  }, [network.length]);

  let syncLayers = () => {
    // layers sync
    if (layers > network.length) {
      // need to add layers
      //console.log('here first', layers - network.length);
      for (let iter = layers - network.length; iter > 0; iter--) {
        dispatchAddLayer(network.length - 2);
      }
    } else if (layers < network.length) {
      for (let iter = network.length - layers; iter > 0; iter--) {
        console.log(network.length);
        dispatchRemoveLayer(layers - 1);
        console.log(network.length);
        //console.log('removed', layers - 2);
      }
    }
  };
  return (
    <div>
      <div>Layers {layers}</div>
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
      {network.layers.map((element) => {})}
    </div>
  );
};

export default OptionsLeft;
