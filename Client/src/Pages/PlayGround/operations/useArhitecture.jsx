import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  addNeuron,
  removeLayer,
  removeNeuron,
  addLayer,
} from '../../../store/network.js';

export function useArchitecture() {
  const dispatch = useDispatch();
  const { network } = useSelector((state) => state);
  const [layers, setLayers] = useState(network.length);
  const [layerSizes, setLayerSizes] = useState(
    network.layers.map((element) => element.numNeurons)
  );

  const setlayerSizesIdx = (index, value) => {
    value = parseInt(value);
    const newSizes = [...layerSizes];
    newSizes.splice(index, 1, value);
    setLayerSizes(newSizes);
  };

  const setMultipleLayerSizes = (...args) => {
    const newSizes = [...layerSizes];

    args.forEach((element) => {
      const { index, value } = element;
      newSizes.splice(index, 1, value);
    });
    setLayerSizes(newSizes);
  };

  const setLayerSizeFactory = (index) => {
    return (value) => {
      setlayerSizesIdx(index, value);
    };
  };

  const syncLayers = () => {
    if (layers > network.length) {
      for (let iter = layers - network.length; iter > 0; iter--) {
        dispatch(addLayer(network.length - 2));
      }
    } else if (layers < network.length) {
      for (let iter = network.length - layers; iter > 0; iter--) {
        dispatch(removeLayer(layers - 1));
      }
    }
  };

  useEffect(() => {
    setLayers(network.length);
  }, [network.length]);

  useEffect(() => {
    setLayerSizes(network.layers.map((element) => element.numNeurons));
  }, [network.layers]);

  useEffect(() => {
    syncLayers();
  }, [layers]);

  useEffect(() => {
    for (let i = 0; i < network.length; i++) {
      if (layerSizes[i] > network.layers[i].numNeurons) {
        for (
          let iter = layerSizes[i] - network.layers[i].numNeurons;
          iter > 0;
          iter--
        ) {
          dispatch(addNeuron(i));
        }
      } else if (layerSizes[i] < network.layers[i].numNeurons) {
        for (
          let iter = network.layers[i].numNeurons - layerSizes[i];
          iter > 0;
          iter--
        ) {
          dispatch(removeNeuron(i));
        }
      }
    }
  }, [layerSizes]);

  return {
    network,
    layers,
    layerSizes,
    setLayers,
    setMultipleLayerSizes,
    setLayerSizeFactory,
  };
}
