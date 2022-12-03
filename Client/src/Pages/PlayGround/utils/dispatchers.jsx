import { useDispatch, useSelector } from 'react-redux';
import {
  addNeuron,
  removeNeuron,
  removeLayer,
  addLayer,
} from '../../../store/network';

import { setInputs, setOutputs, clearState } from '../../../store/data';
import { initializeRecording, addSnapshot } from '../../../store/recording';

let dispatch;
// import { setInputs } from '../../../store/data';
export const setDispatch = (obj) => {
  dispatch = obj;
};

export const dispatchSetInputs = (inputs) => {
  dispatch(setInputs(inputs));
};
export const dispatchSetOutputs = (outputs) => {
  dispatch(setOutputs(outputs));
};
export const dispatchclearDataState = () => {
  dispatch(clearState());
};

export const dispatchAddNeuron = (layer) => {
  dispatch(addNeuron(layer));
};
export const dispatchRemoveNeuron = (layer) => {
  dispatch(removeNeuron(layer));
};

export const dispatchRemoveLayer = (layer) => {
  dispatch(removeLayer(layer));
};

export const dispatchAddLayer = (layer) => {
  dispatch(addLayer(layer));
};

export const dispatchInitializeRecording = (params) => {
  dispatch(initializeRecording(params));
};

export const dispatchAddSnapshot = () => {
  dispatch(addSnapshot());
};
