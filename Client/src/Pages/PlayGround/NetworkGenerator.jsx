import React from 'react';
import { useRef, useEffect } from 'react';
import { select, easeLinear } from 'd3';
import { useDispatch, useSelector } from 'react-redux';
import { addNeuron } from '../../store/network';

import {
  radius,
  strokeW,
  maxHeightY,
  maxHeightX,
  offsetX,
  offsetY,
  layerDistance,
  neuronDistance,
} from './networkParams';

import {
  getLayerCoordX,
  getCoordNeuron,
  getOriginCoordLayer,
  getCoordYNeuronIdx,
  setNetworkState,
} from './positionUtils';

const NetworkGenerator = () => {
  const { network } = useSelector((state) => state);
  const dispatch = useDispatch();
  const originGroup = useRef();

  let generateConnections = (layer) => {
    let layerConn = network.connections[layer];
    // linearizing connection data for use in d3
    let newConn = [];
    for (let conn of layerConn) {
      newConn.push(...conn);
    }

    let rootElement = select(`#group${layer}`);
    //selecting entering lines for animation purposes
    rootElement
      .selectAll('line')
      .data(newConn)
      .enter()
      .append('line')
      .attr('x1', (value) => getCoordNeuron(value.layer1, value.neuron1).x)
      .attr('y1', (value) => getCoordNeuron(value.layer1, value.neuron1).y)
      .attr('x2', (value) => getCoordNeuron(value.layer2, value.neuron2).x)
      .attr('y2', (value) => getCoordNeuron(value.layer2, value.neuron2).y)

      .attr('opacity', 0);
    rootElement
      .selectAll('line')
      .data(newConn)
      .join('line')
      .transition()
      .duration(150)
      .ease(easeLinear)
      .attr('x1', (value) => getCoordNeuron(value.layer1, value.neuron1).x)
      .attr('y1', (value) => getCoordNeuron(value.layer1, value.neuron1).y)
      .attr('x2', (value) => getCoordNeuron(value.layer2, value.neuron2).x)
      .attr('y2', (value) => getCoordNeuron(value.layer2, value.neuron2).y)
      .attr('stroke', 'white')
      .attr('opacity', 1);
  };
  let generateLayer = (layer, step, originPointNeurons) => {
    let neurons = layer.neurons;
    let layerNum = layer.layerNum;
    let rootElement = select(`#group${layerNum}`);
    rootElement
      .selectAll('circle')
      .data(neurons)
      .enter()
      .append('circle')
      .attr('opacity', 0)
      .attr('fill', 'black')
      .attr('cx', getLayerCoordX(layerNum))
      .attr('cy', (value, index) => originPointNeurons + step * index);

    rootElement
      .selectAll('circle')

      .data(neurons)
      .join('circle')
      .attr('r', radius)
      .transition()
      .duration(150)
      .ease(easeLinear)
      .attr('cx', getLayerCoordX(layerNum))
      .attr('opacity', 1)
      .attr('cy', (value, index) => originPointNeurons + step * index)
      .attr('stroke', 'white')
      .attr('className', (value, index) => `neuron${index}`)
      .attr('stroke-width', strokeW);
  };

  let generateNetwork = () => {
    let layers = network.layers;
    let layerIdx = 0;
    for (let layer of layers) {
      // calculating position for each neuron on the layer
      let originPointNeurons = layer.numNeurons;
      let step = neuronDistance;
      originPointNeurons = maxHeightY / 2 - (step * originPointNeurons) / 2;
      if (layerIdx != network.length - 1) generateConnections(layerIdx);
      generateLayer(layer, step, originPointNeurons);
      layerIdx += 1;
    }
  };

  let generateStructure = () => {
    let layers = network.layers;
    let g = select(originGroup.current);
    g.selectAll('g')
      .data(layers)
      .join('g')
      .attr('id', (value, index) => `group${index}`);
  };

  useEffect(() => {
    setNetworkState(network);
    generateStructure();
    generateNetwork();
  }, [network]);

  return <g ref={originGroup}></g>;
};

export default NetworkGenerator;
