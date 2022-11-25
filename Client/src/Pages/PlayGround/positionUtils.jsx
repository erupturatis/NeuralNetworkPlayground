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

let networkState;

let setNetworkState = (state) => {
  networkState = state;
};

let getLayerCoordX;
let getCoordNeuron;
let getOriginCoordLayer;
let getCoordYNeuronIdx;

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
  }
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
  setNetworkState,
};
