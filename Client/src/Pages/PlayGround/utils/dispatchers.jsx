import { useDispatch, useSelector } from 'react-redux';
import { addNeuron, removeNeuron, removeLayer } from '../../../store/network';
let dispatch;

let setDispatch = (obj) => {
  dispatch = obj;
};

let dispatchAddNeuron = (layer) => {
  dispatch(addNeuron(layer));
};
let dispatchRemoveNeuron = (layer) => {
  dispatch(removeNeuron(layer));
};

let dispatchRemoveLayer = (layer) => {
  dispatch(removeLayer(layer));
};

export {
  setDispatch,
  dispatchAddNeuron,
  dispatchRemoveNeuron,
  dispatchRemoveLayer,
};
