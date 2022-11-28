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
  getCoordNeuron,
  getCoordNeuronButtons,
  getCoordRemoveLayerButton,
  getCoordAddLayerButton,
} from './positionUtils';

import { select, easeLinear, zoom, zoomTransform } from 'd3';

import * as d3 from 'd3';

import { networkState as network } from './getState';
import {
  dispatchAddNeuron,
  dispatchRemoveLayer,
  dispatchRemoveNeuron,
  dispatchAddLayer,
} from './dispatchers';

let generateConnections = () => {
  let newConn = [];

  // linearizing connection data
  for (let layer = 0; layer < network.length - 1; layer++) {
    let layerConn = network.connections[layer];
    for (let conn of layerConn) {
      newConn.push(...conn);
    }
  }

  let rootElement = select(`#connections`);
  //selecting entering lines for animation purposes
  rootElement
    .selectAll('line')
    .data(newConn, (data) => data.id)
    .enter()
    .append('line')
    .attr('x1', (value) => getCoordNeuron(value.layer1, value.neuron1).x)
    .attr('y1', (value) => getCoordNeuron(value.layer1, value.neuron1).y)
    .attr('x2', (value) => getCoordNeuron(value.layer2, value.neuron2).x)
    .attr('y2', (value) => getCoordNeuron(value.layer2, value.neuron2).y)

    .attr('opacity', 0);

  rootElement
    .selectAll('line')
    .data(newConn, (data) => data.id)
    // .join('line')
    .transition()
    .duration(animationsSpeed)
    .ease(easeLinear)
    .attr('x1', (value) => getCoordNeuron(value.layer1, value.neuron1).x)
    .attr('y1', (value) => getCoordNeuron(value.layer1, value.neuron1).y)
    .attr('x2', (value) => getCoordNeuron(value.layer2, value.neuron2).x)
    .attr('y2', (value) => getCoordNeuron(value.layer2, value.neuron2).y)
    .attr('stroke', 'white')
    .attr('opacity', 1);

  rootElement
    .selectAll('line')
    .data(newConn, (data) => data.id)
    .exit()
    .transition()
    .duration(animationsSpeed)
    .ease(easeLinear)
    .style('opacity', 1e-6)
    .remove();
};

let addZoom = () => {
  var svg = d3.select('#root-svg');

  svg.call(
    d3
      .zoom()
      .scaleExtent([1 / 2, 3])
      .on('zoom', zoomed)
  );
  svg.on('dblclick.zoom', null);
  function zoomed() {
    console.log('zoomed');
    d3.select('#root-group').attr('transform', d3.zoomTransform(this));
  }
};

let generateNeurons = () => {
  let layers = network.layers;
  let neuronsData = [];
  for (let layer of layers) {
    neuronsData = [...neuronsData, ...layer.neurons];
  }

  let rootElement = select(`#neurons`);
  //liniarizing data

  rootElement
    .selectAll('circle')
    .data(neuronsData, (data) => {
      return data.neuronId;
    })
    .enter()
    .append('circle')
    .attr('opacity', 0)
    .attr('fill', 'black')
    .attr('cx', (value, index) => getCoordNeuron(value.layerNum, value.index).x)
    .attr(
      'cy',
      (value, index) => getCoordNeuron(value.layerNum, value.index).y
    );

  rootElement
    .selectAll('circle')

    .data(neuronsData, (data) => {
      return data.neuronId;
    })
    //.join('circle')
    .attr('r', radius)
    .transition()
    .duration(animationsSpeed)
    .ease(easeLinear)
    .attr('opacity', 1)
    .attr('cx', (value, index) => getCoordNeuron(value.layerNum, value.index).x)
    .attr('cy', (value, index) => getCoordNeuron(value.layerNum, value.index).y)
    .attr('stroke', 'white')
    .attr('className', (value, index) => `neuron${index}`)
    .attr('stroke-width', strokeWNeurons);

  rootElement
    .selectAll('circle')

    .data(neuronsData, (data) => {
      return data.neuronId;
    })
    .exit()
    .transition()
    .duration(animationsSpeed)
    .ease(easeLinear)
    .style('opacity', 1e-6)
    .remove();
};

let initialStructure = () => {
  let layers = network.layers;
  let unpLayers = [...layers];
  let g = select('#originGroup');

  g.selectChildren('g')
    .data(layers)
    .join('g')
    .attr('id', (value, index) => `group${index}`);

  g.append('g').attr('id', 'neurons');

  for (let index = 0; index < network.length; index++) {
    g.select(`#group${index}`)
      .selectChildren('g')
      .data(['connections', 'neurons'])
      .enter()
      .append('g')
      .attr('id', (value) => `${value}${index}`);
  }
};

let generateStructure = () => {
  let layers = network.layers;
  let unpLayers = [...layers];
  let g = select('#originGroup');

  g.selectChildren('g')
    .data(['connections', 'neurons'], (data) => data)
    .join('g')
    .attr('id', (value, index) => {
      return value;
    });

  for (let index = 0; index < network.length; index++) {
    g.select(`#group${index}`)
      .selectChildren('g')
      .data(['connections', 'neurons'])
      .enter()
      .append('g')
      .attr('id', (value) => `${value}${index}`);
  }
};

let validateOptions = (value) => {
  value = value === NaN ? 0 : value;
  value = value === undefined ? 0 : value;
  return value;
};

let generateUIElements = (
  originElement,
  coordFunction,
  data,
  options,
  ...args
) => {
  // making sure arguments are valid
  options.offsetX = validateOptions(options.offsetX);
  options.offsetY = validateOptions(options.offsetY);

  // args are attributes
  originElement
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', options.radius)
    .attr('stroke', '#FFFFFF')
    .attr('opacity', '0')
    .attr('cx', (value) => coordFunction(value).x + options.offsetX)
    .attr('cy', (value) => coordFunction(value).y + options.offsetY);

  let elements = originElement
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('r', options.radius)
    .transition()
    .duration(animationsSpeed)
    .ease(easeLinear)
    .attr('cx', (value) => coordFunction(value).x + options.offsetX)
    .attr('cy', (value) => coordFunction(value).y + options.offsetY);

  for (let arg of args) {
    //adding all properties passed in args
    elements = elements.attr(arg.p1, arg.p2);
  }

  originElement
    .selectAll('circle')
    .data(data)
    .join('circle')
    .on('click', (value, index) => options.dispatch(index));
};

let generateUI = () => {
  let length = network.length;
  let arr = [];
  // generating neuron buttons
  for (let layer = 0; layer < length; layer++) {
    arr.push(layer);
  }

  let rootElementAdd = select('#AddGroup');
  generateUIElements(
    rootElementAdd,
    getCoordNeuronButtons,
    arr,
    {
      radius: (radius * 2) / 3,
      offsetX: -10,
      dispatch: dispatchAddNeuron,
    },

    {
      p1: 'opacity',
      p2: '1',
    }
  );

  let rootElementRemove = select('#RemoveGroup');
  generateUIElements(
    rootElementRemove,
    getCoordNeuronButtons,
    arr,
    {
      radius: (radius * 2) / 3,
      offsetX: 10,
      dispatch: dispatchRemoveNeuron,
    },

    {
      p1: 'opacity',
      p2: '1',
    }
  );
  arr.pop();
  let rootElementAddLayer = select('#AddLayerGroup');
  generateUIElements(
    rootElementAddLayer,
    getCoordAddLayerButton,
    arr,
    {
      radius: radius,
      offsetX: layerDistance / 2,
      offsetY: 0,
      dispatch: dispatchAddLayer,
    },

    {
      p1: 'opacity',
      p2: '1',
    }
  );
  arr.splice(0, 1);

  let rootElementRemoveLayer = select('#RemoveLayerGroup');
  generateUIElements(
    rootElementRemoveLayer,
    getCoordRemoveLayerButton,
    arr,
    {
      radius: radius,
      offsetX: 0,
      offsetY: 0,
      dispatch: dispatchRemoveLayer,
    },

    {
      p1: 'opacity',
      p2: '1',
    }
  );
};

const generatorUtils = () => {
  return (
    <div className="text-white">
      <></>
      <div>generator utils</div>
    </div>
  );
};

let generateNetwork = () => {
  generateConnections();
  generateNeurons();
};

export {
  generateStructure,
  generateNetwork,
  generateUI,
  initialStructure,
  addZoom,
};
