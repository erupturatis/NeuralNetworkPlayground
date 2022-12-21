import { createSlice, current } from '@reduxjs/toolkit';
import { operations } from '../Pages/PlayGround/utils/globals';
const initialState = {
  saved: false,
  networkArhitecture: {},
  trainParams: {},
  inputData: {},
  outputData: {},
  inputDataLabels: {},
  outputDataLabels: {},
  snapshots: [], // snapshot of the weights and accuracy
};

export const recordingSlice = createSlice({
  name: 'recording',
  initialState,
  reducers: {
    initializeRecording: (state, action) => {
      const { network, inputs, outputs, params } = action.payload;
      state.saved = true;
      state.networkArhitecture = network;
      state.trainParams = params;
      state.inputData = inputs[0];
      state.inputDataLabels = inputs[1];
      state.outputData = outputs[0];
      state.outputDataLabels = outputs[1];
      state.snapshots = [];
    },

    addSnapshot: (state, action) => {
      const model = operations.model;
      const epoch = operations.epoch;
      const loss = operations.loss;
      // translating model in network state
      let networkState = state.networkArhitecture;

      for (
        let layerIdx = 0;
        layerIdx < state.networkArhitecture.length - 1;
        layerIdx++
      ) {
        let weigths = model.layers[layerIdx].getWeights();
        let connections;
        let biases;
        connections = weigths[0].arraySync();
        biases = weigths[1].arraySync();
        //console.log(connections, networkState.connections[layerIdx]);
        networkState.connections[layerIdx] = networkState.connections[
          layerIdx
        ].map((neuron) =>
          neuron.map((obj) => {
            return {
              ...obj,
              value: connections[obj.neuron1][obj.neuron2],
            };
          })
        );
        networkState.biasesWeights[layerIdx + 1] = biases;
      }

      state.snapshots.push({ network: networkState, loss });
    },
    replaceRecording: (state, action) => {
      let recording = action.payload;
      console.log(current(state));
      console.log(recording);
      for (let key in state) {
        state[`${key}`] = recording[`${key}`];
      }
    },
  },
});

export const { initializeRecording, addSnapshot, replaceRecording } =
  recordingSlice.actions;
export default recordingSlice.reducer;
