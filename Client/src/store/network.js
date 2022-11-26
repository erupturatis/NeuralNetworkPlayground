import { createSlice, current } from '@reduxjs/toolkit';
import {
  generateLayer,
  generateBiasesWeights,
  generateNeuronsWeights,
  generateNeuron,
  generateRandomWeights,
  generateNeuronWeights,
  generateNeuronWeightsBack,
} from './networkGenerator';

let generateNetwork = (...layers) => {
  let initState = {
    length: layers.length,
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
      // we start generating connection from layer 1 when prev !=0
      generateNeuronsWeights(
        layerIndex - 1,
        layerIndex,
        prevmumNeurons,
        nrNeurons
      )
    );
    layerIndex += 1;
    prevmumNeurons = nrNeurons;
  }
  initState.connections = initState.connections.slice(1);
  return initState;
};

const initialState = generateNetwork(
  {
    numNeurons: 4,
    activation: 'relu',
  },

  {
    numNeurons: 6,
    activation: 'relu',
  },
  {
    numNeurons: 4,
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

      //front connections for the new neuron
      let newConnections = generateNeuronWeights(
        layerNum,
        layerNum + 1,
        state.layers[layerNum].numNeurons - 1,
        state.layers[layerNum + 1].numNeurons
      );

      state.connections[layerNum].push(newConnections);

      //back connections for the new neuron
      let newConnectionsBack = generateNeuronWeightsBack(
        layerNum - 1,
        layerNum,

        state.layers[layerNum - 1].numNeurons,
        state.layers[layerNum].numNeurons - 1
      );
      let newConnBack = [...current(state.connections[layerNum - 1])];
      console.log(newConnBack);

      for (let i = 0; i < newConnBack.length; i++) {
        let conn = newConnectionsBack[i];
        console.log(newConnBack[i], conn);
        newConnBack[i] = [...newConnBack[i], conn];
        console.log(newConnBack[i], conn);
      }

      state.connections[layerNum - 1] = newConnBack;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNeuron } = networkSlice.actions;

export default networkSlice.reducer;
