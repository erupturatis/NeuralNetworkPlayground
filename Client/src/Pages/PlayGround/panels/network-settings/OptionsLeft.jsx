import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cosmetics from './Cosmetics';
import Arhitecture from './Arhitecture';
import Advanced from './Advanced';
import Datasets from './Datasets';
import './left.css';

const OptionsLeft = ({ toggleOptions }) => {
  const { network, cosmetics, data } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [layers, setLayers] = useState(network.length);

  const [layerSizes, setLayerSizes] = useState(
    network.layers.map((element) => element.numNeurons)
  );

  return (
    <div
      style={{
        'scrollbar-gutter': 'stable'
      }}
      className=' p-3 h-5/6 overflow-y-auto overflow-x-hidden w-full scroll pr-4 select-none '
    >
      <Datasets toggleOptions={toggleOptions} />
      <Arhitecture />
      <Cosmetics />
      <Advanced />
    </div>
  );
};

export default OptionsLeft;
