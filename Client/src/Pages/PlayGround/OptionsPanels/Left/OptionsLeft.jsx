import React from 'react';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Cosmetics from './Cosmetics';
import Arhitecture from './Arhitecture';
import Advanced from './Advanced';
import Datasets from './Datasets';

const OptionsLeft = () => {
  const { network, cosmetics, data } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [layers, setLayers] = useState(network.length);

  const [layerSizes, setLayerSizes] = useState(
    network.layers.map((element) => element.numNeurons)
  );

  return (
    <div>
      <Arhitecture />
      <Cosmetics />
      <Advanced />
      <Datasets />
    </div>
  );
};

export default OptionsLeft;
