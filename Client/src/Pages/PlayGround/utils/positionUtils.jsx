import { networkState } from './globals';
import { store } from '../../../store/store';

let getLayerCoordX = (layerIdx) => {
  let { cosmetics } = store.getState();
  let { maxHeightX, layerDistance } = cosmetics;

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

  originPointX = aroundCenter + maxHeightX / 2;
  return originPointX + layerIdx * layerDistance;
};

let getCoordNeuron = (layer, index) => {
  let { cosmetics } = store.getState();
  let { maxHeightY, neuronDistance } = cosmetics;

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

let getCoordAddLayerButton = (layer) => {
  let { cosmetics } = store.getState();
  let { maxHeightY, neuronDistance, AddLayerButtonOffsetY } = cosmetics;
  let network = networkState;
  let step = neuronDistance;
  let minPoint = 100000;
  for (let layer = 0; layer < network.length; layer++) {
    let numNeurons = network.layers[layer].numNeurons;
    let finishPointNeurons = maxHeightY / 2 - (step * (numNeurons - 1)) / 2;
    minPoint = Math.min(minPoint, finishPointNeurons);
  }
  let currentPosX = getLayerCoordX(layer);
  let currentPosY = minPoint + AddLayerButtonOffsetY;
  return {
    x: currentPosX,
    y: currentPosY,
  };
};

let getCoordNeuronButtons = (layer) => {
  let { cosmetics } = store.getState();
  let { neuronDistance, maxHeightY, NeuronButtonsOffsetY } = cosmetics;
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

let getCoordRemoveLayerButton = (layer) => {
  // calculating the global pos based on the longest layer
  let { cosmetics } = store.getState();
  let { radius, maxHeightY, neuronDistance, NeuronButtonsOffsetY } = cosmetics;
  let network = networkState;
  let step = neuronDistance;
  let minPoint = 0;
  for (let layer = 0; layer < network.length; layer++) {
    let numNeurons = network.layers[layer].numNeurons;
    let finishPointNeurons = maxHeightY / 2 + (step * numNeurons) / 2;
    minPoint = Math.max(minPoint, finishPointNeurons);
  }
  let currentPosX = getLayerCoordX(layer);
  let currentPosY = minPoint + NeuronButtonsOffsetY + radius * 4;
  return {
    x: currentPosX,
    y: currentPosY,
  };
};

let getOriginCoordLayer = (layer, index) => {
  let { cosmetics } = store.getState();
  let { neuronDistance, maxHeightY } = cosmetics;
  let network = networkState;
  let step = neuronDistance;
  let numNeurons = network.layers[layer].numNeurons;

  let originPointNeurons = maxHeightY / 2 - (step * numNeurons) / 2;
  return originPointNeurons;
};

let getCoordYNeuronIdx = (originPointNeurons, index) => {
  let { cosmetics } = store.getState();
  let { neuronDistance } = cosmetics;

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
  getCoordAddLayerButton,
  getCoordNeuronButtons,
  getCoordRemoveLayerButton,
};
