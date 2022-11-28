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

let getLayerCoordX = (layerIdx) => {
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

let getCoordNeuron = (layer, index) => {
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

let getCoordAddLayer = (layer) => {
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

let getCoordNeuronButtons = (layer) => {
  // calculating the global pos based on the longest layer
  let network = networkState;
  let step = neuronDistance;
  let maxPoint = 0;
  for (let layer = 0; layer < network.length; layer++) {
    let numNeurons = network.layers[layer].numNeurons;
    let finishPointNeurons = maxHeightY / 2 + (step * (numNeurons - 1)) / 2;
    maxPoint = Math.max(maxPoint, finishPointNeurons);
  }
  let currentPosX = getLayerCoordX(layer);
  let currentPosY = maxPoint + NeuronButtonsOffsetY;
  return {
    x: currentPosX,
    y: currentPosY,
  };
};

let getOriginCoordLayer = (layer, index) => {
  let network = networkState;
  let step = neuronDistance;
  let numNeurons = network.layers[layer].numNeurons;

  let originPointNeurons = maxHeightY / 2 - (step * numNeurons) / 2;
  return originPointNeurons;
};

let getCoordYNeuronIdx = (originPointNeurons, index) => {
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
