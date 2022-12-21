import React from 'react';
import Papa from 'papaparse';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { mapInputs, mapOutputs } from '../../utils/generatorUtils';
import { dispatchSetInputs, dispatchSetOutputs } from '../../utils/dispatchers';
import { operations } from '../../utils/globals';
import { replaceState } from '../../../../store/network';
import { setInputsLabel, setOutputsLabel } from '../../../../store/data';

const OptionsTop = () => {
  const { network, recording, data, running } = useSelector((state) => state);
  const [epoch, setEpoch] = useState(0);
  const [selectedSnapshot, setSelectedSnapshot] = useState(0);
  const [isRunning, setIsRunning] = useState();
  const [fill, setFill] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    processInputData();
    processOutputData();
  }, [network.length]);

  useEffect(() => {
    setIsRunning(running.running);
    setSelectedSnapshot(running.epoch);
    // setSelectedSnapshot(network.epoch);
  }, [running.running]);

  useEffect(() => {
    setFill(running.fill);
  }, [running.fill]);

  useEffect(() => {
    // replacing the network weights
    // need refactor into its own custom hook
    if (selectedSnapshot < recording.snapshots.length) {
      dispatch(replaceState(recording.snapshots[selectedSnapshot].network));
    }
  }, [selectedSnapshot]);

  const setInputs = (result) => {
    dispatchSetInputs(result);
    mapInputs(result.meta.fields);
  };
  const setOutputs = (result) => {
    dispatchSetOutputs(result);
    mapOutputs(result.meta.fields);
  };

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
          setInputs(result);
          dispatch(
            setInputsLabel(document.getElementById('inputData').files[0].name)
          );
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
          setOutputs(result);
          dispatch(
            setOutputsLabel(document.getElementById('outputData').files[0].name)
          );
        },
      });
    } catch {}
  };

  let runNetwork = async () => {
    //running the network
    operations.change(network, data.input, data.output);
    operations.setParams(network, data.input, data.output);
    operations.runNetwork();
  };

  return (
    <div className=" w-full">
      <button
        onClick={() => {
          loadFile();
        }}
      >
        Load file
      </button>
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
              className="hidden"
            />
            <div className="flex">
              <input
                type="button"
                value="input Browse..."
                className=" border-2 w-28 h-10"
                onClick={() => {
                  document.getElementById('inputData').click();
                }}
              />
              <div>{data.inputLabel}</div>
            </div>
          </div>
          <div>
            <input
              type="file"
              id="outputData"
              accept=".csv, .txt"
              onChange={() => {
                processOutputData();
              }}
              className="hidden"
            />
            <div className="flex">
              <input
                type="button"
                value="output Browse..."
                className=" border-2 w-28 h-10"
                onClick={() => {
                  document.getElementById('outputData').click();
                }}
              />
              <div>{data.outputLabel}</div>
            </div>
          </div>
        </div>
        <div className="w-20">
          <button
            onClick={() => {
              runNetwork();
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
      <br />
      {!isRunning && recording.saved ? (
        <>
          <div className="relative pt-1 w-72">
            <label className="form-label">Example range</label>
            <input
              id="range"
              type="range"
              min="0"
              max={recording.snapshots.length}
              value={selectedSnapshot}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              onChange={(e) => {
                setSelectedSnapshot(e.target.value);
              }}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OptionsTop;
