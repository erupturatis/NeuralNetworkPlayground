import React from 'react';
import { useRef, useEffect } from 'react';
import { select, easeLinear } from 'd3';
import { useDispatch, useSelector } from 'react-redux';
import { addNeuron } from '../../store/network';

import {
  generateStructure,
  generateNetwork,
  generateUI,
} from './utils/generatorUtils';

import { setDispatch } from './utils/dispatchers';

import { setNetworkState } from './utils/getState';

const NetworkGenerator = () => {
  const { network } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setNetworkState(network);
    setDispatch(dispatch);
    generateStructure();
    generateNetwork();
    generateUI();
  }, [network]);

  return <g id="originGroup"></g>;
};

export default NetworkGenerator;
