import {
  radius,
  strokeWNeurons,
  maxHeightY,
  maxHeightX,
  offsetX,
  offsetY,
  layerDistance,
  neuronDistance,
  AddLayerButtonOffsetY,
  NeuronButtonsOffsetY,
  NeuronButtonsOffsetX,
} from '../networkParams';

import { networkState } from './getState';

let getLayerCoordX = (layerIdx) => {};
let getCoordNeuron = (layer, index) => {};
let getOriginCoordLayer = (layer, index) => {};
let getCoordYNeuronIdx = (originPointNeurons, index) => {};
let getCoordAddLayer = (layer) => {};
let getCoordNeuronButtons = (layer) => {};

getLayerCoordX = (layerIdx) => {
  let network = networkState;
  let totalLayersNum = network.length;
  let originPointX = 0;
  let aroundCenter = 0;
  if (totalLayersNum % 2 == 0) {
    aroundCenter = -(
      layerDistance * (totalLayersNum / 2 - 1) +
      layerDistance / 2
    );
  } else {
    aroundCenter = -(layerDistance * parseInt(totalLayersNum / 2));
  }
  //console.log(aroundCenter, totalLayersNum % 2);
  originPointX = aroundCenter + maxHeightX / 2;
  return originPointX + layerIdx * layerDistance;
};

getCoordNeuron = (layer, index) => {
  let network = networkState;
  let step = neuronDistance;
  let numNeurons = network.layers[layer].numNeurons;

  let originPointNeurons = maxHeightY / 2 - (step * numNeurons) / 2;
  let currentPosX = getLayerCoordX(layer);
  let currentPosY = originPointNeurons + step * index;
  return {
    x: currentPosX,
    y: currentPosY,
  };
};

getCoordAddLayer = (layer) => {
  let network = networkState;
  let step = neuronDistance;
  let numNeurons = network.layers[layer].numNeurons;

  let originPointNeurons = maxHeightY / 2 - (step * numNeurons) / 2;
  let currentPosX = getLayerCoordX(layer);
  let currentPosY = originPointNeurons + AddLayerButtonOffsetY;
  return {
    x: currentPosX,
    y: currentPosY,
  };
};

getCoordNeuronButtons = (layer) => {
  let network = networkState;
  let step = neuronDistance;
  let numNeurons = network.layers[layer].numNeurons;

  let originPointNeurons = maxHeightY / 2 + (step * (numNeurons - 1)) / 2;
  let currentPosX = getLayerCoordX(layer);
  let currentPosY = originPointNeurons + NeuronButtonsOffsetY;
  return {
    x: currentPosX,
    y: currentPosY,
  };
};

getOriginCoordLayer = (layer, index) => {
  let network = networkState;
  let step = neuronDistance;
  let numNeurons = network.layers[layer].numNeurons;

  let originPointNeurons = maxHeightY / 2 - (step * numNeurons) / 2;
  return originPointNeurons;
};

getCoordYNeuronIdx = (originPointNeurons, index) => {
  let network = networkState;
  let step = neuronDistance;
  let numNeurons = network.layers[layer].numNeurons;
  let currentPosY = originPointNeurons + step * index;
  return currentPosY;
};

export {
  getLayerCoordX,
  getCoordNeuron,
  getOriginCoordLayer,
  getCoordYNeuronIdx,
  getCoordAddLayer,
  getCoordNeuronButtons,
};
