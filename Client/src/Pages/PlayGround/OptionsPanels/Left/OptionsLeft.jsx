import React from 'react';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  dispatchAddLayer,
  dispatchAddNeuron,
  dispatchRemoveLayer,
  dispatchRemoveNeuron,
} from '../../utils/dispatchers';
import { setDispatch } from '../../utils/dispatchers';
import RangeSlider from '../../../../Components/RangeSlider';
import { changeSetting, resetSettings } from '../../../../store/cosmetics';
import { changeProperty } from '../../../../store/network';
import Settings from './Settings';

const OptionsLeft = () => {
  const { network, cosmetics } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [layers, setLayers] = useState(network.length);

  const [showActivation, setShowActivation] = useState(false);
  const [showLoss, setShowLoss] = useState(false);
  const [showEpochs, setShowEpochs] = useState(false);

  const [layerSizes, setLayerSizes] = useState(
    network.layers.map((element) => element.numNeurons)
  );

  useEffect(() => {
    setLayers(network.length);
  }, [network.length]);

  useEffect(() => {
    setLayerSizes(network.layers.map((element) => element.numNeurons));
  }, [network.layers]);

  useEffect(() => {
    setDispatch(dispatch);
  }, []);

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
          dispatchAddNeuron(i);
        }
      } else if (layerSizes[i] < network.layers[i].numNeurons) {
        for (
          let iter = network.layers[i].numNeurons - layerSizes[i];
          iter > 0;
          iter--
        ) {
          dispatchRemoveNeuron(i);
        }
      }
    }
    //
  }, [layerSizes]);

  let setlayerSizesIdx = (index, value) => {
    value = parseInt(value);
    let newSizes = [...layerSizes];
    newSizes.splice(index, 1, value);
    setLayerSizes(newSizes);
  };

  let setLayerSizeFactory = (index) => {
    return (value) => {
      setlayerSizesIdx(index, value);
    };
  };

  let syncLayers = () => {
    // layers sync
    if (layers > network.length) {
      // need to add layers
      for (let iter = layers - network.length; iter > 0; iter--) {
        dispatchAddLayer(network.length - 2);
      }
    } else if (layers < network.length) {
      for (let iter = network.length - layers; iter > 0; iter--) {
        dispatchRemoveLayer(layers - 1);
      }
    }
  };
  return (
    <div>
      <div>Layers {layers}</div>
      <div className="h-72 overflow-auto">
        <input
          id="range"
          type="range"
          min="2"
          max="20"
          value={layers}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          onChange={(e) => {
            setLayers(e.target.value);
          }}
        />
        {network.layers.map((element) => {
          return (
            <RangeSlider
              label={`Layer ${element.layerNum} with ${element.numNeurons} neurons`}
              min={1}
              max={25}
              key={`${element.layerNum}`}
              element={element}
              valueTracker={layerSizes[element.layerNum]}
              setValue={setLayerSizeFactory(element.layerNum)}
            />
          );
        })}
      </div>
      <div className="overflow-auto border-2">
        <RangeSlider
          label={`Layer Distance ${cosmetics.layerDistance}`}
          min={25}
          max={300}
          valueTracker={cosmetics.layerDistance}
          setValue={(value) => {
            // console.log(value);
            dispatch(
              changeSetting({
                label: 'layerDistance',
                data: value,
              })
            );
          }}
        />
        <RangeSlider
          label={`Neurons Distance ${cosmetics.neuronDistance}`}
          min={10}
          max={200}
          valueTracker={cosmetics.neuronDistance}
          setValue={(value) => {
            // console.log(value);
            dispatch(
              changeSetting({
                label: 'neuronDistance',
                data: value,
              })
            );
          }}
        />
        <RangeSlider
          label={`Neurons radius ${cosmetics.radius}`}
          min={5}
          max={20}
          valueTracker={cosmetics.radius}
          setValue={(value) => {
            // console.log(value);
            dispatch(
              changeSetting({
                label: 'radius',
                data: value,
              })
            );
          }}
        />
        <RangeSlider
          label={`Line width ${cosmetics.strokeWConnections * 10}`}
          min={5}
          max={20}
          valueTracker={cosmetics.strokeWConnections * 10}
          setValue={(value) => {
            console.log(value / 10);
            dispatch(
              changeSetting({
                label: 'strokeWConnections',
                data: value / 10,
              })
            );
          }}
        />
      </div>
      <Settings
        trigger={showActivation}
        setTrigger={setShowActivation}
        optionsValues={['Relu', 'Elu', 'Tanh', 'Sigmoid']}
        name={'Activation'}
        value={network.activation}
        prop={'activation'}
      />
      <Settings
        trigger={showEpochs}
        setTrigger={setShowEpochs}
        optionsValues={[50, 100, 250]}
        name={'Epochs'}
        value={network.epochs}
        prop={'epochs'}
      />
      <Settings
        trigger={showLoss}
        setTrigger={setShowLoss}
        optionsValues={[
          'MeanSquaredError',
          'CategoricalCrossEntropy',
          'meanSquaredLogarithmicError',
        ]}
        name={'Loss'}
        value={network.loss}
        prop={'loss'}
      />
    </div>
  );
};

export default OptionsLeft;
