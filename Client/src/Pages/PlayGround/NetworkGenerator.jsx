import React from 'react';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { mapInputs, mapOutputs } from './utils/generatorUtils';

import {
  generateStructure,
  generateNetwork,
  generateUI,
  addZoom,
} from './utils/generatorUtils';

import { Operations } from './operations/networkOperations';
import { setOperation } from './utils/operation';

const NetworkGenerator = () => {
  const { network, cosmetics, data } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    setOperation(new Operations());
    generateStructure();
    addZoom();
  }, []);

  useEffect(() => {
    generateStructure();
    generateNetwork();
    // generateUI();
    if (data.inputisSet) {
      mapInputs(data.inputLabels);
    }
    if (data.outputisSet) {
      mapOutputs(data.outputLabels);
    }
  }, [network, cosmetics]);

  return (
    <>
      <g id="originGroup"></g>
      <g id="AddGroup"></g>
      <g id="RemoveGroup"></g>
      <g id="AddLayerGroup"></g>
      <g id="RemoveLayerGroup"></g>
      <g id="tooltip-area">
        <rect
          x="120"
          y="120"
          width="95"
          height="40"
          rx="15"
          stroke="white"
          opacity={0}
        ></rect>
        <text
          opacity={0}
          id="tooltiptxt"
          x="0"
          y="50"
          fontSize={15}
          fill="white"
        >
          weight:60
        </text>
      </g>
    </>
  );
};

export default NetworkGenerator;
