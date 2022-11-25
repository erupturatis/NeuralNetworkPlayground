import React from 'react';
import { useRef, useEffect } from 'react';
import { select, easeLinear } from 'd3';
import { useDispatch, useSelector } from 'react-redux';
import { addNeuron } from '../../store/network';

import { generateStructure, generateNetwork } from './utils/generatorUtils';

import { setNetworkState } from './utils/getNetworkState';

const NetworkGenerator = () => {
  const { network } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setNetworkState(network);
    generateStructure();
    generateNetwork();
  }, [network]);

  return <g id="originGroup"></g>;
};

export default NetworkGenerator;
