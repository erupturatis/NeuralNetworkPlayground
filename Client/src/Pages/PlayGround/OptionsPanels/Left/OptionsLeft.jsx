import React from 'react';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Cosmetics from './Cosmetics';
import Arhitecture from './Arhitecture';
import Advanced from './Advanced';
import Datasets from './Datasets';
import './left.css';

const OptionsLeft = () => {
  const { network, cosmetics, data } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [layers, setLayers] = useState(network.length);

  const [layerSizes, setLayerSizes] = useState(
    network.layers.map((element) => element.numNeurons)
  );

  return (
    <div
      style={{
        'scrollbar-gutter': 'stable',
      }}
      className=' p-3 h-5/6 overflow-y-auto overflow-x-hidden w-full scroll pr-4 select-none '
    >
      <Arhitecture />
      <Cosmetics />
      <Advanced />
      <Datasets />
    </div>
  );
};

export default OptionsLeft;
