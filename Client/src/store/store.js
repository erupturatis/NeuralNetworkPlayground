import { configureStore } from '@reduxjs/toolkit';
import networkReducer from './network';
import dataReducer from './data';
import recordingReducer from './recording';

export const store = configureStore({
  reducer: {
    network: networkReducer,
    data: dataReducer,
    recording: recordingReducer,
  },
});
