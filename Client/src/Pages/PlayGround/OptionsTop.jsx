import React from 'react';
import Papa from 'papaparse';
import { useSelector } from 'react-redux';
import { Operations } from './operations/networkOperations';
import { useEffect } from 'react';
import * as brain from 'brain.js';
import { mapInputs, mapOutputs } from './utils/generatorUtils';
import { dispatchSetInputs, dispatchSetOutputs } from './utils/dispatchers';
import { operations } from './utils/globals';

const OptionsTop = () => {
  const { network, data } = useSelector((state) => state);

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
          dispatchSetInputs(result);
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
          dispatchSetOutputs(result);
          mapOutputs(result.meta.fields);
        },
      });
    } catch {}
  };

  let runNetwork = async () => {
    //run
    operations.setParams(network, data.input, data.output);
    await operations.runNetwork();
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
        <button
          onClick={async () => {
            await runNetwork();
          }}
        >
          run network
        </button>
      </div>

      <div>ceva si aici</div>
    </div>
  );
};

export default OptionsTop;
