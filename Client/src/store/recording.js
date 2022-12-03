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

        networkState.connections[layerIdx] = connections;
        networkState.biasesWeights[layerIdx + 1] = biases;
      }

      state.snapshots.push(networkState);
    },
  },
});

export const { initializeRecording, addSnapshot } = recordingSlice.actions;
export default recordingSlice.reducer;
