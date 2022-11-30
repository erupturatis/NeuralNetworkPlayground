import { createSlice, current } from '@reduxjs/toolkit';

initialState = {
  input: '',
  output: '',
  isSet: false,
};

export const dataSlice = {
  name: 'data',
  initialState,
};
