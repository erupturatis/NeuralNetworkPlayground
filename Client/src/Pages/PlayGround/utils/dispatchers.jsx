import { useDispatch, useSelector } from 'react-redux';
import { addNeuron, removeNeuron } from '../../../store/network';
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

export { setDispatch, dispatchAddNeuron, dispatchRemoveNeuron };
