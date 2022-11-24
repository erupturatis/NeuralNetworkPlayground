import { createSlice } from '@reduxjs/toolkit';
import {
  generateLayer,
  generateBiasesWeights,
  generateNeuronWeights,
  generateNeuron,
  generateRandomWeights,
} from './networkGenerator';

let generateNetwork = (...layers) => {
  let initState = {
    layers: [],
    biases: [],
    biasesWeights: [],
    connections: [],
  };
  let layerIndex = 0;
  let prevmumNeurons = 0;
  for (let layer of layers) {
    let nrNeurons = layer.numNeurons;
    initState.layers.push(
      generateLayer(layerIndex, nrNeurons, layer.activation)
    );
    initState.biases.push(Math.random());
    initState.biasesWeights.push(generateBiasesWeights(nrNeurons));
    initState.connections.push(
      generateNeuronWeights(prevmumNeurons, nrNeurons)
    );
    layerIndex += 1;
    prevmumNeurons = nrNeurons;
  }
  initState.connections = initState.connections.slice(1);
  return initState;
};

const initialState = generateNetwork(
  {
    numNeurons: 3,
    activation: 'relu',
  },
  {
    numNeurons: 2,
    activation: 'relu',
  },
  {
    numNeurons: 6,
    activation: 'relu',
  },
  {
    numNeurons: 3,
    activation: 'relu',
  }
);

// first index is layer, second is neuron position
export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    addNeuron: (state, action) => {
      // modifying neuron number and adding a new neuron
      let layerNum = action.payload;
      let newLayer = state.layers[layerNum];
      let currentNeuronsNum = newLayer.numNeurons;
      newLayer.numNeurons = currentNeuronsNum + 1;
      newLayer.neurons.push(generateNeuron(layerNum, currentNeuronsNum));

      state.layers[layerNum] = newLayer;
      // adding corresponding connections

      // getting weights according to the next layer of numNeurons
      let newConnections = generateRandomWeights(
        state.layers[layerNum + 1].numNeurons
      );
      state.connections[layerNum].push(newConnections);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNeuron } = networkSlice.actions;

export default networkSlice.reducer;
