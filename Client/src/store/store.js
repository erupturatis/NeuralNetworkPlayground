import { configureStore } from '@reduxjs/toolkit';
import networkReducer from './network';
import dataReducer from './data';
import recordingReducer from './recording';
import runningReducer from './running';

export const store = configureStore({
  reducer: {
    network: networkReducer,
    data: dataReducer,
    recording: recordingReducer,
    running: runningReducer,
  },
});
