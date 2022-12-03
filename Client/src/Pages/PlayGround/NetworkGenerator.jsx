import React from 'react';
import { useRef, useEffect } from 'react';
import { select, easeLinear } from 'd3';
import { useDispatch, useSelector } from 'react-redux';
import { addNeuron } from '../../store/network';

import {
  generateStructure,
  generateNetwork,
  generateUI,
  addZoom,
} from './utils/generatorUtils';

import { setDispatch } from './utils/dispatchers';
import { setNetworkState, setOperations } from './utils/globals';
import { Operations } from './operations/networkOperations';
const NetworkGenerator = () => {
  const { network } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setNetworkState(network);
    generateStructure();
    setOperations(new Operations());
    addZoom();
  }, []);

  useEffect(() => {
    console.log('regenerated drawing');
    setNetworkState(network);
    generateStructure();
    generateNetwork();
    generateUI();
  }, [network]);

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
