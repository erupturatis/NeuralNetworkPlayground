import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  input: '',
  output: '',
  inputLabels: '',
  outputLabels: '',
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
    clearState: (state, action) => {
      state = initialState;
    },
  },
});

export const { setInputs, setOutputs, clearState } = dataSlice.actions;
export default dataSlice.reducer;
