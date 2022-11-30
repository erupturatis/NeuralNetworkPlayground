import { configureStore } from '@reduxjs/toolkit';
import networkReducer from './network';
import dataReducer from './data';

export const store = configureStore({
  reducer: {
    network: networkReducer,
    data: dataReducer,
  },
});
