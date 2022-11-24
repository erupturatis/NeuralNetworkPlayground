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

export const generateBiasesWeights = (numNeurons) => {
  return generateRandomWeights(numNeurons);
};

export const generateNeuronWeights = (numNeuronsLayer1, numNeuronsLayer2) => {
  let neuronWeights = [];
  for (let i = 0; i < numNeuronsLayer1; i++) {
    neuronWeights.push(generateRandomWeights(numNeuronsLayer2));
  }
  return neuronWeights;
};
