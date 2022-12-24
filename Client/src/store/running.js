import { createSlice, current } from '@reduxjs/toolkit';
const initialState = {
  running: false,
  fill: 0,
  epoch: 0,
  operations: null,
  networkState: null,
};

export const runningSlice = createSlice({
  name: 'running',
  initialState,
  reducers: {
    changeRun: (state, action) => {
      let current = state.running;
      state.running = !current;
    },
    setFill: (state, action) => {
      state.fill = action.payload;
    },
    setEpoch: (state, action) => {
      state.epoch = action.payload;
    },
  },
});

export const { changeRun, setFill, setEpoch } = runningSlice.actions;
export default runningSlice.reducer;
