import React from 'react';
import Papa from 'papaparse';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { mapInputs, mapOutputs } from '../../utils/generatorUtils';
import { setInputs, setOutputs } from '../../../../store/data';
import { replaceState, randomizeWeights } from '../../../../store/network';
import { setInputsLabel, setOutputsLabel } from '../../../../store/data';
import { operation } from '../../utils/operation';
import pause from './assets/pause.png';
import run from './assets/running.png';
const OptionsTop = () => {
  const { network, recording, data, running } = useSelector((state) => state);
  const [epoch, setEpoch] = useState(0);
  const [selectedSnapshot, setSelectedSnapshot] = useState(0);
  const [isRunning, setIsRunning] = useState();
  const [fill, setFill] = useState(0);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    processInputData();
    processOutputData();
  }, [network.length]);

  useEffect(() => {
    setIsRunning(running.running);
    setSelectedSnapshot(running.epoch / network.recordFreq);
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
    dispatch(setInputs(result));
    mapInputs(result.meta.fields);
  };
  const setOutputs = (result) => {
    dispatch(setOutputs(result));
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
    operation.change();
    // console.log(network);
    operation.setParams(network, data.input, data.output);
    let response = await operation.runNetwork();
    if (response !== false) {
      response = JSON.stringify(response);
      setError(response);
    }
  };

  return (
    <div className=" w-full">
      <div className="">
        <div className=" flex justify-center">
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
              <button
                className="w-40 h-8 bg-[#2677d4] rounded-lg "
                onClick={() => {
                  document.getElementById('inputData').click();
                }}
              >
                Choose input file
              </button>
              <div className="flex justify-center items-center mx-4">
                {data.inputLabel}
              </div>
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
              <button
                className=" w-40 h-8 bg-[#2677d4] rounded-lg "
                onClick={() => {
                  document.getElementById('outputData').click();
                }}
              >
                Choose output file
              </button>
              <div className="flex justify-center items-center mx-4">
                {data.outputLabel}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full  flex justify-center  mt-6 ">
          <div className=" w-52 mr-16">
            <div className=" h-10  text-lg font-normal flex justify-center items-center">
              <div className="flex ">
                <button
                  onClick={() => {
                    runNetwork();
                  }}
                  className="text-xl font-light opacity-50 hover:opacity-100"
                >
                  {recording.saved ? 'Rerun network' : 'Run network'}
                </button>
                <img
                  src={isRunning ? run : pause}
                  alt=""
                  className="w-7 h-7 ml-3"
                />
              </div>
            </div>
            <div className="w-full flex justify-center ">
              <button
                onClick={() => {
                  dispatch(randomizeWeights());
                }}
                className="bg-[#3C3C3C] mt-4 p-2 rounded-md opacity-50 hover:opacity-100"
              >
                Randomize weights
              </button>
            </div>
          </div>
          <div className="w-96 relative">
            <div
              className="w-full h-6  border-2  rounded-md mt-2 z-10"
              style={{
                background: `linear-gradient(90deg, rgba(42,133,237,1) 0%, rgba(42,133,237,1) ${fill}%, rgba(74,95,170,0) ${fill}%, rgba(27,41,69,0) 100%)`,
              }}
            ></div>
            <div>
              {error && (
                <div className="text-red-900 text-lg text-center mt-4 ">
                  {error}
                </div>
              )}
              {!isRunning && recording.saved ? (
                <>
                  <div className="relative pt-1 w-full ">
                    <input
                      id="range"
                      type="range"
                      min="0"
                      max={recording.snapshots.length - 1}
                      value={selectedSnapshot}
                      className="w-full mt-4 h-3 bg-transparent rounded-lg appearance-none cursor-pointer border-2"
                      onChange={(e) => {
                        setSelectedSnapshot(e.target.value);
                      }}
                    />
                  </div>
                  <div className="w-full flex justify-center font-light opacity-30">
                    select any epoch
                  </div>
                  <div className="flex justify-center text-lg ">
                    Epoch {selectedSnapshot * network.recordFreq}
                  </div>
                  <div className="flex justify-center text-md ">
                    Loss {recording.snapshots[selectedSnapshot].loss.toFixed(6)}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsTop;
