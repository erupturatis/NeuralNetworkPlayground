// utils for generating neural network initial data

export const generateNeuron = (layerNum, index) => {
  return {
    overRideAct: 'relu',
    layerNum,
    index,
  };
};

export const generateNeurons = (layerNum, numNeurons) => {
  let neurons = [];
  for (let i = 0; i < numNeurons; i++) {
    neurons.push(generateNeuron(layerNum, i));
  }
  return neurons;
};

export const generateLayer = (layerNum, numNeurons, activation) => {
  let layer = {
    // maybe add individual custom neurons
    layerNum,
    numNeurons,
    defaultActivation: activation,
    neurons: generateNeurons(layerNum, numNeurons),
  };

  return layer;
};

export const generateRandomWeights = (numNeurons) => {
  let Weights = [];
  for (let i = 0; i < numNeurons; i++) {
    Weights.push(Math.random());
  }
  return Weights;
};

export const generateRandomConnections = (numNeurons) => {
  let Weights = [];
  for (let i = 0; i < numNeurons; i++) {
    Weights.push(Math.random());
  }
  return Weights;
};

export const generateBiasesWeights = (numNeurons) => {
  return generateRandomWeights(numNeurons);
};

export const generateNeuronsWeights = (
  layer1,
  layer2,
  numNeuronsLayer1,
  numNeuronsLayer2
) => {
  let neuronWeights = [];
  for (let i = 0; i < numNeuronsLayer1; i++) {
    let neuronWeightsLocal = [];
    for (let j = 0; j < numNeuronsLayer2; j++) {
      neuronWeightsLocal.push({
        value: Math.random(),
        layer1,
        layer2,
        neuron1: i,
        neuron2: j,
      });
    }
    neuronWeights.push(neuronWeightsLocal);
  }
  return neuronWeights;
};
export const generateNeuronWeights = (
  layer1,
  layer2,
  neuron1Index,
  numNeuronsLayer2
) => {
  let neuronWeightsLocal = [];
  for (let j = 0; j < numNeuronsLayer2; j++) {
    neuronWeightsLocal.push({
      value: Math.random(),
      layer1,
      layer2,
      neuron1: neuron1Index,
      neuron2: j,
    });
  }
  return neuronWeightsLocal;
};

export const generateNeuronWeightsBack = (
  layer1,
  layer2,
  numNeuronsLayer1,
  neuron2Index
) => {
  let neuronWeightsLocal = [];
  for (let j = 0; j < numNeuronsLayer1; j++) {
    neuronWeightsLocal.push({
      value: Math.random(),
      layer1,
      layer2,
      neuron1: j,
      neuron2: neuron2Index,
    });
  }
  return neuronWeightsLocal;
};
