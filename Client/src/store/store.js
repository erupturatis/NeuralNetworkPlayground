import { configureStore } from '@reduxjs/toolkit';
import networkReducer from './network';

export const store = configureStore({
  reducer: {
    network: networkReducer,
  },
});
