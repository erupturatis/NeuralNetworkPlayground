import React from 'react';
import Papa from 'papaparse';

import { Layer, Network } from 'synaptic';
import { useSelector } from 'react-redux';

const OptionsTop = () => {
  const { network } = useSelector((state) => state);
  let parsingCSVData = () => {
    console.log('go here');
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
    let inputLayer = new Layer(network.layers[0].numNeurons);
    let outputLayer = new Layer(network.layers[network.length - 1].numNeurons);
    console.log(network.layers[network.length - 1].numNeurons);
    inputLayer.project(outputLayer);
    let processedInputs = [];
    for (let key in inputs) {
      processedInputs.push(inputs[key]);
    }
    console.log(processedInputs);
    var myNetwork = new Network({
      input: inputLayer,
      hidden: [],
      output: outputLayer,
    });
    console.log(myNetwork.activate(processedInputs));
  };

  return (
    <div className=" w-full">
      <div className="flex">
        <input type="file" id="inputData" accept=".csv, .txt" />
        <div className="w-20">
          <button onClick={parsingCSVData}>run network</button>
        </div>
      </div>
      <div>ceva si aici</div>
    </div>
  );
};

export default OptionsTop;
