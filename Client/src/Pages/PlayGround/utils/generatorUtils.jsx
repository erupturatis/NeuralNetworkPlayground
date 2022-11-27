import {
  radius,
  strokeWNeurons,
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
import { dispatchAddNeuron } from './dispatchers';

let generateConnections = (layer) => {
  let layerConn = network.connections[layer];
  // linearizing connection data for use in d3
  let newConn = [];
  for (let conn of layerConn) {
    newConn.push(...conn);
  }

  let rootElement = select(`#connections${layer}`);

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
  let rootElementGroup = select(`#neurons${layerNum}`);
  let aux = [0];

  rootElementGroup
    .selectAll('g')
    .data(aux)
    .join('g')
    .attr('id', (value, index) => `neurons${layerNum}`);

  let rootElement = select(`#neurons${layerNum}`);

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
    .attr('stroke-width', strokeWNeurons);
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

  g.selectChildren('g')
    .data(layers)
    .join('g')
    .attr('id', (value, index) => `group${index}`);
  for (let index = 0; index < network.length; index++) {
    g.select(`#group${index}`)
      .selectChildren('g')
      .data(['connections', 'neurons'])
      .enter()
      .append('g')
      .attr('id', (value) => `${value}${index}`);
  }
};

let generateUI = () => {
  let length = network.length;
  let arr = [];
  let arrRemove = [];
  // generating neuron buttons
  for (let layer = 0; layer < length; layer++) {
    arr.push(layer);
    arrRemove.push(layer);
  }
  // let { x, y } = getCoordNeuronButtons(layer);
  // console.log(x, y);
  let rootElementAdd = select('#AddGroup');

  rootElementAdd
    .selectAll('circle')
    .data(arr)
    .enter()
    .append('circle')
    .attr('r', (radius * 2) / 3)
    .attr('stroke', '#FFFFFF')
    .attr('opacity', '0')
    .attr(
      'cx',
      (value) => getCoordNeuronButtons(value).x - ((radius * 2) / 3) * 1.5
    )
    .attr('cy', (value) => getCoordNeuronButtons(value).y);

  rootElementAdd
    .selectAll('circle')
    .data(arr)
    .join('circle')
    .attr('r', (radius * 2) / 3)
    .transition()
    .duration(animationsSpeed)
    .ease(easeLinear)
    .attr('stroke', '#FFFFFF')
    .attr('opacity', '1')
    .attr(
      'cx',
      (value) => getCoordNeuronButtons(value).x - ((radius * 2) / 3) * 1.5
    )
    .attr('cy', (value) => getCoordNeuronButtons(value).y);

  rootElementAdd
    .selectAll('circle')
    .data(arr)
    .join('circle')
    .on('click', (value, index) => dispatchAddNeuron(index));

  let rootElementRemove = select('#RemoveGroup');

  rootElementRemove
    .selectAll('circle')
    .data(arr)
    .enter()
    .append('circle')
    .attr('r', (radius * 2) / 3)
    .attr('stroke', '#FFFFFF')
    .attr('opacity', '0')
    .attr(
      'cx',
      (value) => getCoordNeuronButtons(value).x + ((radius * 2) / 3) * 1.5
    )
    .attr('cy', (value) => getCoordNeuronButtons(value).y);

  rootElementRemove
    .selectAll('circle')
    .data(arr)
    .join('circle')
    .attr('r', (radius * 2) / 3)
    .transition()
    .duration(animationsSpeed)
    .ease(easeLinear)
    .attr('stroke', '#FFFFFF')
    .attr('opacity', '1')
    .attr(
      'cx',
      (value) => getCoordNeuronButtons(value).x + ((radius * 2) / 3) * 1.5
    )
    .attr('cy', (value) => getCoordNeuronButtons(value).y);
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
