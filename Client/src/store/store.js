import { configureStore } from '@reduxjs/toolkit';
import networkReducer from './network';
import dataReducer from './data';
import recordingReducer from './recording';
import runningReducer from './running';
import cosmeticReducer from './cosmetics';
import userReducer from './user';

export const store = configureStore({
  reducer: {
    network: networkReducer,
    data: dataReducer,
    recording: recordingReducer,
    running: runningReducer,
    cosmetics: cosmeticReducer,
    user: userReducer,
  },
});
