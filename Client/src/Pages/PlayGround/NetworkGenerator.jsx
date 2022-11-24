import React from 'react';
import { useRef, useEffect } from 'react';
import { select, easeLinear } from 'd3';
import { useDispatch, useSelector } from 'react-redux';
import { addNeuron } from '../../redux/network';

let radius = 10;
let strokeW = 1;
let maxHeight = 500;

const NetworkGenerator = () => {
  const { network } = useSelector((state) => state);
  const dispatch = useDispatch();
  const originGroup = useRef();

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
      .attr('cx', 60 + layer.layerNum * 100)
      .attr('cy', (value, index) => originPointNeurons + step * index);

    rootElement
      .selectAll('circle')

      .data(neurons)
      .join('circle')
      .attr('r', radius)
      .transition()
      .duration(200)
      .ease(easeLinear)
      .attr('cx', 60 + layer.layerNum * 100)
      .attr('opacity', 1)
      .attr('cy', (value, index) => originPointNeurons + step * index)
      .attr('stroke', 'white')
      .attr('className', (value, index) => `neuron${index}`)
      .attr('stroke-width', strokeW);
  };

  let getCoordNeuron = (layer, index) => {
    let step = radius * 3;
    let numNeurons = network.layers[layer].numNeurons;

    let originPointNeurons = maxHeight / 2 - (step * numNeurons) / 2;
    let currentPosX = 60 + layer * 100;
    let currentPosY = originPointNeurons + step * index;
    return {
      x: currentPosX,
      y: currentPosY,
    };
  };

  let generateConnections = (layer) => {
    console.log(layer);
    let layerConn = network.connections[layer];
    // linearizing connection data for use in d3
    let newConn = [];
    for (let conn of layerConn) {
      newConn.push(...conn);
    }
    console.log(newConn);
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
      .duration(200)
      .ease(easeLinear)
      .attr('x1', (value) => getCoordNeuron(value.layer1, value.neuron1).x)
      .attr('y1', (value) => getCoordNeuron(value.layer1, value.neuron1).y)
      .attr('x2', (value) => getCoordNeuron(value.layer2, value.neuron2).x)
      .attr('y2', (value) => getCoordNeuron(value.layer2, value.neuron2).y)
      .attr('stroke', 'white')
      .attr('opacity', 1);
  };

  let generateNetwork = () => {
    let layers = network.layers;
    let layerIdx = 0;
    for (let layer of layers) {
      // calculating position for each neuron on the layer
      let originPointNeurons = layer.numNeurons;
      let step = radius * 3;
      originPointNeurons = maxHeight / 2 - (step * originPointNeurons) / 2;
      generateLayer(layer, step, originPointNeurons);
      if (layerIdx != network.length - 1) generateConnections(layerIdx);
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

  let getPosition = (layerNum, position) => {
    let rootElement = select(`#group${layerNum}`);
    let coord = getCoordNeuron(layerNum, position);
    console.log(coord);
  };

  useEffect(() => {
    generateStructure();
    generateNetwork();
  }, [network]);

  return <g ref={originGroup}></g>;
};

export default NetworkGenerator;
