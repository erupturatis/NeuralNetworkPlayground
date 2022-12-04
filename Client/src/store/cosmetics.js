import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  radius: 10,
  strokeWNeurons: 1,
  strokeWConnections: 1,
  maxHeightY: window.innerHeight,
  maxHeightX: window.innerWidth,
  offsetX: 0,
  offsetY: 0,
  layerDistance: 50,
  neuronDistance: 40, // radius * 4
  AddLayerButtonOffsetY: -50,
  NeuronButtonsOffsetY: 40,
  NeuronButtonsOffsetX: -25,
  animationsSpeed: 150,
};

export const cosmeticSlice = createSlice({
  name: 'cosmetics',
  initialState,
  reducers: {
    changeSetting: (state, action) => {
      let label = action.payload.label;
      let data = action.payload.data;
      state[label] = data;
    },
  },
});

export const { changeSetting } = cosmeticSlice.actions;
export default cosmeticSlice.reducer;
