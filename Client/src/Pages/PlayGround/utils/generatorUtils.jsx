import {
  radius,
  strokeW,
  maxHeightY,
  maxHeightX,
  offsetX,
  offsetY,
  layerDistance,
  neuronDistance,
  animationsSpeed,
} from '../networkParams';

import {
  getLayerCoordX,
  getCoordNeuron,
  getOriginCoordLayer,
  getCoordYNeuronIdx,
  getCoordNeuronButtons,
} from './positionUtils';

import { select, easeLinear } from 'd3';

import { networkState as network } from './getState';

let generateConnections = (layer) => {
  let layerConn = network.connections[layer];
  // linearizing connection data for use in d3
  let newConn = [];
  console.log('connections');
  for (let conn of layerConn) {
    console.log(conn);
    newConn.push(...conn);
  }

  let rootElement = select(`#group${layer}`);
  //selecting entering lines for animation purposes
  rootElement
    .selectAll('line')
    .data(
      newConn,
      (data) => `${data.layer1} ${data.layer2} ${data.neuron1} ${data.neuron2}`
    )
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
    .duration(animationsSpeed)
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
    .duration(animationsSpeed)
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
  let unpLayers = [...layers];
  let g = select('#originGroup');
  g.selectAll('g')
    .data(layers)
    .join('g')
    .attr('id', (value, index) => `group${index}`);
};

let generateUI = () => {
  let length = network.length;
  let arr = [];
  // generating neuron buttons
  for (let layer = 0; layer < length; layer++) {
    arr.push(layer);
  }
  // let { x, y } = getCoordNeuronButtons(layer);
  // console.log(x, y);
  let rootElement = select('#originGroup');
  rootElement
    .selectAll('foreignObject')
    .data(arr)
    .join('foreignObject')
    .attr('class', 'node')
    .attr('width', 100)
    .attr('height', 100)
    .attr('x', (value) => getCoordNeuronButtons(value).x)
    .attr('y', (value) => getCoordNeuronButtons(value).y)

    .html('<button class="networkButton">Click me</button>');
};

const generatorUtils = () => {
  return (
    <div className="text-white">
      <></>
      <div>generator utils</div>
    </div>
  );
};

export { generateStructure, generateNetwork, generateUI };
