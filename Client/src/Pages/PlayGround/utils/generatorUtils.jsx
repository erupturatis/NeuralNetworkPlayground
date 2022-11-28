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

import { select, easeLinear, zoom, zoomTransform } from 'd3';

import * as d3 from 'd3';

import { networkState as network } from './getState';
import { dispatchAddNeuron, dispatchRemoveNeuron } from './dispatchers';

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

  // var zoom =
  // svg.call(
  //   d3
  //     .zoom()
  //     // .extent([
  //     //   [0, 0],
  //     //   [1200, 660],
  //     // ])
  //     .scaleExtent([0.2, 2])
  //     .on('zoom', () => {
  //       console.log('zoomed');
  //       const zoomState = zoomTransform(svg.node());
  //       svg.attr('transform', zoomState);
  //     })
  // );

  // function zoomed(cords) {
  //   console.log(svg);
  //   svg.attr('transform', d3.event.transform);
  // }

  svg.call(
    d3
      .zoom()
      .scaleExtent([1 / 2, 8])
      .on('zoom', zoomed)
  );

  function zoomed() {
    console.log('zoomed');
    d3.select('#root-group').attr('transform', d3.zoomTransform(this));
  }

  //resize();
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

  rootElementRemove
    .selectAll('circle')
    .data(arr)
    .join('circle')
    .on('click', (value, index) => dispatchRemoveNeuron(index));
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
