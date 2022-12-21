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
import { setInputs, setOutputs } from '../../../../store/data';
import { mapInputs, mapOutputs } from '../../utils/generatorUtils';
import { setInputsLabel, setOutputsLabel } from '../../../../store/data';

const OptionsLeft = () => {
  const { network, cosmetics, data } = useSelector((state) => state);
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
  const setInputsFunc = (result) => {
    dispatch(setInputs(result));
    mapInputs(result.meta.fields);
  };
  const setOutputsFunc = (result) => {
    dispatch(setOutputs(result));
    mapOutputs(result.meta.fields);
  };
  const FILES = {
    XOR: ['/public/Files/XORinputs.txt', '/public/Files/XORoutputs.txt'],
    files2: ['', ''],
  };

  let uploadFiles = async (name) => {
    let paths = FILES[`${name}`];

    let inputPath = paths[0];
    let outputPath = paths[1];
    dispatch(setInputsLabel(`${name} inputs.txt`));
    dispatch(setOutputsLabel(`${name} outputs.txt`));

    let inputResult = {
      meta: {
        fields: '',
      },
      data: [],
    };
    let outputResult = {
      meta: {
        fields: '',
      },
      data: [],
    };

    // reading the premade files
    let inputText = await fetch(inputPath).then((response) => response.text());
    let outputText = await fetch(outputPath).then((response) =>
      response.text()
    );

    inputText = inputText.split(/\r?\n/);
    outputText = outputText.split(/\r?\n/);

    // creating the result
    let inputLabels = inputText.splice(0, 1)[0].split(',');
    let outputLabels = outputText.splice(0, 1)[0].split(',');

    inputResult['meta']['fields'] = inputLabels;
    outputResult['meta']['fields'] = outputLabels;

    inputResult['data'] = [];
    outputResult['data'] = [];

    let formatData = (inputText, inputLabels, arr) => {
      for (let line of inputText) {
        let obj = {};
        line = line.split(',');
        line = line.filter((el) => {
          if (el !== '') {
            return el;
          }
        });
        console.log(line);
        for (let index in line) {
          // console.log(line, index);
          obj[`${inputLabels[index]}`] = parseInt(line[index]);
        }
        arr['data'].push(obj);
      }
    };
    formatData(inputText, inputLabels, inputResult);
    formatData(outputText, outputLabels, outputResult);

    setInputsFunc(inputResult);
    setOutputsFunc(outputResult);
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
        optionsValues={['relu', 'elu', 'tanh', 'sigmoid']}
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
      <div className="flex w-72 border-2 h-60">
        <button className="border-2 w-10 h-10"> down</button>
        <div>The xor dataset</div>
        <button
          onClick={() => {
            uploadFiles('XOR');
          }}
          className="border-2 w-10 h-10"
        >
          uplo
        </button>
      </div>
    </div>
  );
};

export default OptionsLeft;
