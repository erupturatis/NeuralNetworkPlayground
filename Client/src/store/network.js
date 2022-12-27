import { createSlice, current } from '@reduxjs/toolkit';
import {
  generateLayer,
  generateBiasesWeights,
  generateNeuronsWeights,
  generateNeuron,
  generateWeight,
  generateNeuronWeights,
  generateNeuronWeightsBack,
} from './networkGenerator';

let generateNetwork = (...layers) => {
  let initState = {
    length: layers.length,
    activation: 'sigmoid',
    loss: 'meanSquaredError',
    epochs: 100,
    recordFreq: 5,
    learningRate: 0.01,
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
  initState.biasesWeights[0] = [];
  // initState.biasesWeights[layers.length - 1] = [];
  initState.connections = initState.connections.slice(1);
  return initState;
};

const initialState = generateNetwork(
  {
    numNeurons: 2,
    activation: 'relu',
  },

  {
    numNeurons: 5,
    activation: 'relu',
  },
  {
    numNeurons: 1,
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
      if (layerNum != state.length - 1) {
        //front connections for the new neuron
        let newConnections = generateNeuronWeights(
          layerNum,
          layerNum + 1,
          state.layers[layerNum].numNeurons - 1,
          state.layers[layerNum + 1].numNeurons
        );

        state.connections[layerNum].push(newConnections);
      }
      if (layerNum == 0) return;
      //back connections for the new neuron
      let newConnectionsBack = generateNeuronWeightsBack(
        layerNum - 1,
        layerNum,

        state.layers[layerNum - 1].numNeurons,
        state.layers[layerNum].numNeurons - 1
      );

      let newConnBack = [...current(state.connections[layerNum - 1])];
      for (let i = 0; i < newConnBack.length; i++) {
        let conn = newConnectionsBack[i];
        newConnBack[i] = [...newConnBack[i], conn];
      }
      state.biasesWeights[layerNum].push(generateWeight());
      state.connections[layerNum - 1] = newConnBack;
    },

    removeNeuron: (state, action) => {
      // modifying neuron number and adding a new neuron
      let layerNum = action.payload;
      //removing bias weight
      state.biasesWeights[layerNum].pop();
      //removing connections from back to front
      if (layerNum > 0) {
        state.connections[layerNum - 1] = state.connections[
          layerNum - 1
        ].filter((arr) => arr.pop());
      }
      //removing conntions current to front
      if (layerNum != state.length - 1) state.connections[layerNum].pop();
      //removing the neuron itself
      state.layers[layerNum].numNeurons -= 1;
      state.layers[layerNum].neurons.pop();
    },

    removeLayer: (state, actions) => {
      let layerNum = actions.payload;
      // shifting connections layers
      for (let idx = layerNum + 1; idx < state.length - 1; idx++) {
        state.connections[idx] = state.connections[idx].map((connArr) => {
          return connArr.map((el) => {
            el.layer1 -= 1;
            el.layer2 -= 1;
            return el;
          });
        });
      }
      //shifting layers neurons indexes
      for (let idx = layerNum + 1; idx < state.length; idx++) {
        state.layers[idx].layerNum -= 1;
        state.layers[idx].neurons = state.layers[idx].neurons.map((neuron) => {
          neuron.layerNum -= 1;
          return neuron;
        });
      }
      //removing front connections
      state.connections.splice(layerNum, 1);
      //removing front layer
      state.layers.splice(layerNum, 1);

      // removing connections from the back
      state.connections[layerNum - 1] = [];
      // generating new connections between layer-1 and layer
      let newConn = generateNeuronsWeights(
        layerNum - 1,
        layerNum,

        state.layers[layerNum - 1].numNeurons,
        state.layers[layerNum].numNeurons
      );
      state.connections[layerNum - 1] = newConn;

      state.length -= 1;
    },

    addLayer: (state, actions) => {
      let layerNum = actions.payload;
      // shifting connections layers
      for (let idx = layerNum + 1; idx < state.length - 1; idx++) {
        state.connections[idx] = state.connections[idx].map((connArr) => {
          return connArr.map((el) => {
            el.layer1 += 1;
            el.layer2 += 1;
            return el;
          });
        });
      }
      //shifting layers neurons indexes
      for (let idx = layerNum + 1; idx < state.length; idx++) {
        state.layers[idx].layerNum += 1;
        state.layers[idx].neurons = state.layers[idx].neurons.map((neuron) => {
          neuron.layerNum += 1;
          return neuron;
        });
      }
      //removing connections between layerNum-1 and layerNum
      state.connections[layerNum] = [];
      //adding a new layer after LayerNum position with 1 neuron
      let newLayer = generateLayer(
        layerNum + 1,
        state.layers[layerNum].numNeurons,
        'relu'
      );
      state.layers.splice(layerNum + 1, 0, newLayer);
      state.biases.splice(layerNum + 1, 0, Math.random());

      //creating connections from layerNum-1 to newly added layerNum
      let newConn = generateNeuronsWeights(
        layerNum,
        layerNum + 1,

        state.layers[layerNum].numNeurons,
        state.layers[layerNum + 1].numNeurons
      );
      state.connections[layerNum] = newConn;
      //creating connections from layerNum to layerNum+1
      state.connections.splice(layerNum + 1, 0, []);
      newConn = generateNeuronsWeights(
        layerNum + 1,
        layerNum + 2,

        state.layers[layerNum + 1].numNeurons,
        state.layers[layerNum + 2].numNeurons
      );
      state.biasesWeights.splice(
        layerNum + 1,
        0,
        generateBiasesWeights(state.layers[layerNum + 1].numNeurons)
      );
      state.connections[layerNum + 1] = newConn;

      state.length += 1;
    },
    replaceState: (state, action) => {
      let newState = action.payload;
      state.length = newState.length;
      state.layers = newState.layers;
      state.biases = newState.biases;
      state.biasesWeights = newState.biasesWeights;
      state.connections = newState.connections;
    },

    changeProperty: (state, action) => {
      let prop = action.payload.prop;
      state[prop] = action.payload.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNeuron,
  removeNeuron,
  removeLayer,
  addLayer,
  replaceState,
  changeProperty,
} = networkSlice.actions;

export default networkSlice.reducer;
