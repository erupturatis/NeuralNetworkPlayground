import React from 'react';
import Papa from 'papaparse';
import { useSelector } from 'react-redux';
import { Operations } from './operations/networkOperations';
import { useEffect } from 'react';
import * as brain from 'brain.js';
import { mapInputs, mapOutputs } from './utils/generatorUtils';

const OptionsTop = () => {
  const { network } = useSelector((state) => state);
  let parsingCSVData = () => {
    Papa.parse(document.getElementById('inputData').files[0], {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        // saving input in redux state
        // running the network
        console.log(result);

        runNetwork(result.data[0]);
      },
    });
  };
  let runNetwork = (inputs) => {
    let processedInputs = [];
    for (let key in inputs) {
      processedInputs.push(inputs[key]);
    }

    const net = new brain.NeuralNetwork({
      hiddenLayers: [10],
      activation: 'sigmoid',
    });
    let _Data = [
      { input: [0, 0], output: [0] },
      { input: [0, 1], output: [1] },
      { input: [1, 0], output: [1] },
      { input: [1, 1], output: [0] },
    ];

    net.train(_Data, { iterations: 1 });
    console.log(net);
    // let res = net.train(_Data);

    console.log(net.run([0, 0]));
    console.log(net.run([1, 0]));
    console.log(net.run([0, 1]));
    console.log(net.run([1, 1]));
  };

  useEffect(() => {
    let operations = new Operations();
  }, []);

  useEffect(() => {
    processInputData();
    processOutputData();
  }, [network.length]);

  let processInputData = () => {
    try {
      Papa.parse(document.getElementById('inputData').files[0], {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          mapInputs(result.meta.fields);
        },
      });
    } catch {}
  };

  let processOutputData = () => {
    try {
      Papa.parse(document.getElementById('outputData').files[0], {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          mapOutputs(result.meta.fields);
        },
      });
    } catch {}
  };

  return (
    <div className=" w-full">
      <div className="flex">
        <input
          type="file"
          id="inputData"
          accept=".csv, .txt"
          onChange={() => {
            processInputData();
          }}
        />
        <input
          type="file"
          id="outputData"
          accept=".csv, .txt"
          onChange={() => {
            processOutputData();
          }}
        />
      </div>
      <div className="w-20">
        <button onClick={parsingCSVData}>run network</button>
      </div>

      <div>ceva si aici</div>
    </div>
  );
};

export default OptionsTop;
