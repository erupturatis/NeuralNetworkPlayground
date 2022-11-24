import { createSlice } from '@reduxjs/toolkit';
import {
  generateLayer,
  generateBiasesWeights,
  generateNeuronWeights,
  generateNeuron,
  generateRandomWeights,
} from './networkGenerator';

const initialState = {
  layers: [generateLayer(0, 3, 'relu'), generateLayer(1, 2, 'sigmoid')],
  biases: [1, 2],
  biasesWeights: [generateBiasesWeights(3), generateBiasesWeights(2)],
  connections: [generateNeuronWeights(3, 2)],
};
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
