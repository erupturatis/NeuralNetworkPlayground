import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import arrow from './assets/arrowdown.png';
import { useDispatch, useSelector } from 'react-redux';
import { setInputsLabel, setInputs } from '../../../../store/data';
import { setOutputsLabel, setOutputs } from '../../../../store/data';
import { mapInputs, mapOutputs } from '../../utils/generatorUtils';

import download from './assets/download.png';
import upload from './assets/upload.png';
import { useArchitecture } from '../../operations/useArhitecture.jsx';
import { operation } from '../../utils/operation.jsx';


const Dataset = ({ datasetName, uploadFiles, params, startProtocol }) => {
  return (
    <div className='flex w-full  mt-6 justify-center md:justify-start'>
      <div className='w-40 flex items-center justify-center font-medium select-none'>
        <div>
          The {datasetName} dataset
          <div className=' font-light text-center'>{params.inputs} inputs {params.outputs} output</div>
        </div>
      </div>

      <button
        onClick={() => {
          uploadFiles();
          startProtocol();
        }}
        className=' w-30 h-10 flex justify-center  items-center'
      >
        <img src={'running.png'} alt='' className='w-8 h-8 mr-2' />
      </button>
    </div>
  );
};


const Datasets = () => {
  const [display, setDisplay] = useState(false);
  const dispatch = useDispatch();

  const {
    network,
    layers,
    layerSizes,
    setLayers,
    setMultipleLayerSizes,
    setLayerSizeFactory,
    data
  } = useArchitecture();

  const dataRef = useRef(data);
  dataRef.current = data;
  const networkRef = useRef(network);
  networkRef.current = network;

  function getData() {
    return dataRef.current;
  }

  function getNetwork() {
    return networkRef.current;
  }

  const runNetwork = async () => {
    //running the network
    operation.change();
    const data = getData();
    const network = getNetwork();
    operation.setParams(network, data.input, data.output);
    let response = await operation.runNetwork();
  };

  const [hide, setHide] = useState(true);


  const setInputsFunc = (result) => {
    dispatch(setInputs(result));
    mapInputs(result.meta.fields);
  };
  const setOutputsFunc = (result) => {
    dispatch(setOutputs(result));
    mapOutputs(result.meta.fields);
  };
  const FILES = {
    XOR: ['/Files/XORinputs.txt', '/Files/XORoutputs.txt'],
    IRIS: ['/Files/IRISInputs.csv', '/Files/IRISOutputs.csv']
  };

  let uploadFiles = async (name) => {
    let paths = FILES[`${name}`];

    let inputPath = paths[0];
    let outputPath = paths[1];
    dispatch(setInputsLabel(`${name} inputs.txt`));
    dispatch(setOutputsLabel(`${name} outputs.txt`));

    let inputResult = {
      meta: {
        fields: ''
      },
      data: []
    };
    let outputResult = {
      meta: {
        fields: ''
      },
      data: []
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
        if (!line.length) {
          continue;
        }
        for (let index in line) {
          // console.log(line, index);
          obj[`${inputLabels[index]}`] = parseFloat(line[index]);
        }
        arr['data'].push(obj);
      }
    };
    formatData(inputText, inputLabels, inputResult);
    formatData(outputText, outputLabels, outputResult);

    setInputsFunc(inputResult);
    setOutputsFunc(outputResult);
    console.log('inputs ran');
  };
  return (
    <div>
      <div className={' flex justify-center md:justify-start mb-4'}>
        <button
          onClick={() => {
            setDisplay((e) => !e);
          }}
          className='flex mt-4'
        >
          <img
            src={arrow}
            alt=''
            className={`mt-1 w-5 h-5 transition-transform select-none ${
              display ? ' -rotate-90' : ''
            }`}
          />
          <div className=' text-lg ml-4 select-none '>Quickstart</div>
        </button>
      </div>

      <div
        className={` transition-all mb-4 ${
          !display
            ? ' '
            : 'pointer-events-none -translate-y-10 opacity-0 z-0 absolute w-full'
        }`}
      >

        <Dataset datasetName={'XOR'} uploadFiles={() => {
          uploadFiles('XOR').then(() => {
            setTimeout(() => {
              runNetwork();
            }, 0);
          });
        }} params={{ inputs: 2, outputs: 1 }}
                 startProtocol={() => {

                   setMultipleLayerSizes({
                     index: 0,
                     value: 2
                   }, {
                     index: layerSizes.length - 1,
                     value: 1
                   });
                 }} />


        <Dataset datasetName={'IRIS'} uploadFiles={() => {
          uploadFiles('IRIS').then(() => {
            runNetwork();
          });
        }} params={{ inputs: 4, outputs: 3 }}
                 startProtocol={() => {
                   setMultipleLayerSizes({
                     index: 0,
                     value: 4
                   }, {
                     index: layerSizes.length - 1,
                     value: 3
                   });
                 }} />
      </div>
    </div>
  );
};

export default Datasets;
