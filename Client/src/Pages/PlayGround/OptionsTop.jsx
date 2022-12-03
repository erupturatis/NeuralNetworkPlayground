import React from 'react';
import Papa from 'papaparse';
import { useSelector } from 'react-redux';
import { Operations } from './operations/networkOperations';
import { useEffect, useState } from 'react';
import * as brain from 'brain.js';
import { mapInputs, mapOutputs } from './utils/generatorUtils';
import { dispatchSetInputs, dispatchSetOutputs } from './utils/dispatchers';
import { operations } from './utils/globals';

const OptionsTop = () => {
  const { network, recording, data, running } = useSelector((state) => state);
  const [epoch, setEpoch] = useState(0);
  const [isRunning, setIsRunning] = useState();
  const [fill, setFill] = useState(0);

  useEffect(() => {
    processInputData();
    processOutputData();
  }, [network.length]);

  useEffect(() => {
    setIsRunning(running.running);
  }, [running.running]);

  useEffect(() => {
    setFill(running.fill);
  }, [running.fill]);

  useEffect(() => {
    setEpoch(running.epoch);
  }, [running.epoch]);
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
    //running the network
    operations.setParams(network, data.input, data.output);
    await operations.runNetwork();
    console.log('finished running');
  };

  return (
    <div className=" w-full">
      <div className="flex">
        <div className="border-2">
          <div>
            <input
              type="file"
              id="inputData"
              accept=".csv, .txt"
              onChange={() => {
                processInputData();
              }}
            />
          </div>
          <div>
            <input
              type="file"
              id="outputData"
              accept=".csv, .txt"
              onChange={() => {
                processOutputData();
              }}
            />
          </div>
        </div>
        <div className="w-20">
          <button
            onClick={async () => {
              await runNetwork();
            }}
          >
            {recording.saved ? 'rerun network' : 'run network'}
          </button>
        </div>
      </div>
      <div className="w-64 h-6 bg-white mt-2">
        <div
          className="bg-blue-800 h-full"
          style={{
            width: `${fill}%`,
          }}
        ></div>
      </div>
      {isRunning ? `Epoch ${epoch}` : 'not running'}
    </div>
  );
};

export default OptionsTop;
