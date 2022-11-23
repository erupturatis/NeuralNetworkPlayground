import React from 'react';
import { useRef, useEffect } from 'react';
import { select } from 'd3';

let radius = 30;
let maxHeight = 1000;

const LayerGenerator = ({ data, layerNum }) => {
  let originGroup = useRef();

  useEffect(() => {
    console.log('ran', layerNum);
    let svg = select('#root-svg');

    let g = select(originGroup.current);
    let originPointNeurons = data.length;
    let step = radius * 3;
    originPointNeurons = maxHeight / 2 - (step * data.length) / 2;
    g.selectAll('circle')
      .data(data)
      .join('circle')
      .attr('r', radius)
      .attr('cx', 60 + layerNum * 100)
      .attr('cy', (value, index) => originPointNeurons + step * index)
      .attr('stroke', 'red')
      .attr('stroke-width', 2);
  }, [data]);

  return <g ref={originGroup}></g>;
};

export default LayerGenerator;
