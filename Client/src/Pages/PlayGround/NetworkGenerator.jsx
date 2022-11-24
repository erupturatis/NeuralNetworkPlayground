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
      .attr('cy', (value, index) => originPointNeurons + step * index);

    rootElement
      .selectAll('circle')

      .data(neurons)
      .join('circle')
      .attr('r', radius)
      .attr('cx', 60 + layer.layerNum * 100)
      .transition()
      .duration(200)
      .ease(easeLinear)
      .attr('opacity', 1)
      .attr('cy', (value, index) => originPointNeurons + step * index)
      .attr('stroke', 'white')
      .attr('className', 'new')
      .attr('stroke-width', strokeW);
  };

  let generateNetwork = () => {
    let layers = network.layers;
    let g = select(originGroup.current);
    g.selectAll('g')
      .data(layers)
      .join('g')
      .attr('id', (value, index) => `group${index}`);

    for (let layer of layers) {
      console.log(layer);
      // calculating position for each neuron on the layer
      let originPointNeurons = layer.numNeurons;
      let step = radius * 3;
      originPointNeurons = maxHeight / 2 - (step * originPointNeurons) / 2;

      generateLayer(layer, step, originPointNeurons);
    }
  };
  useEffect(() => {
    generateNetwork();
  }, []);

  return <g ref={originGroup}></g>;
};

export default NetworkGenerator;
