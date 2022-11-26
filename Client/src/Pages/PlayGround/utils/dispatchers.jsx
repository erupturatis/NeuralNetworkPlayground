import { useDispatch, useSelector } from 'react-redux';
import { addNeuron } from '../../../store/network';
let dispatch;

let setDispatch = (obj) => {
  dispatch = obj;
};

let dispatchAddNeuron = (layer) => {
  console.log('dispacthcd', layer);
  dispatch(addNeuron(layer));
};

export { setDispatch, dispatchAddNeuron };
