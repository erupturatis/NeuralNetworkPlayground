import { store } from '../../../store/store';

export const getColor = (weight) => {
  if (weight > 0) {
    return '#00C3FF';
  } else {
    return '#FF0000';
  }
};
export const getOpacity = (weight, maxWeight) => {
  weight = Math.abs(weight);
  // the value of the opacity should be between 30% and 100%
  let opacity = 0.3 + 0.7 * (weight / maxWeight);
  return opacity;
};
export const getStroke = (weight, meanWeight) => {
  let { cosmetics } = store.getState();
  let { strokeWConnections } = cosmetics;

  weight = Math.abs(weight);
  // deviating from the stroke with +- 1 depending on the ratio
  let stroke = strokeWConnections;
  let formula = 0.3 * Math.min(1, Math.abs(weight - meanWeight) / meanWeight);
  if (weight < meanWeight) {
    stroke -= formula;
  } else {
    stroke += formula;
  }

  return stroke;
};
