import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  input: '',
  output: '',
  inputLabel: 'no file selected',
  outputLabel: 'no file selected',
  inputisSet: false,
  outputisSet: false,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setInputs: (state, action) => {
      state.input = action.payload.data;
      state.inputLabels = action.payload.meta.fields;
      state.inputisSet = true;
    },
    setOutputs: (state, action) => {
      state.output = action.payload.data;
      state.outputLabels = action.payload.meta.fields;
      state.outputisSet = true;
    },
    setInputsLabel: (state, action) => {
      state.inputLabel = action.payload;
    },
    setOutputsLabel: (state, action) => {
      state.outputLabel = action.payload;
    },
    clearState: (state, action) => {
      state = initialState;
    },
  },
});

export const {
  setInputs,
  setOutputs,
  clearState,
  setInputsLabel,
  setOutputsLabel,
} = dataSlice.actions;
export default dataSlice.reducer;
