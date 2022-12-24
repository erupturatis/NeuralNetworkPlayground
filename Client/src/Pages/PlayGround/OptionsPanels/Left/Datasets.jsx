import React from 'react';
import { useState } from 'react';
import arrow from './assets/arrowdown.png';
import { useDispatch } from 'react-redux';
import { setInputsLabel, setInputs } from '../../../../store/data';
import { setOutputsLabel, setOutputs } from '../../../../store/data';
import { mapInputs, mapOutputs } from '../../utils/generatorUtils';
const Datasets = () => {
  const [display, setDisplay] = useState(true);
  const dispatch = useDispatch();

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
      <div>
        <button
          onClick={() => {
            setDisplay((e) => !e);
          }}
          className="flex mt-4"
        >
          <img
            src={arrow}
            alt=""
            className={`mt-1 w-5 h-5 transition-transform ${
              display ? ' -rotate-90' : ''
            }`}
          />
          <div className=" text-lg ml-4 ">Network cosmetics</div>
        </button>
      </div>

      <div
        className={` transition-all mb-4 ${
          !display
            ? ' '
            : 'pointer-events-none -translate-y-10 opacity-0 z-0 absolute w-full'
        }`}
      >
        <div className="flex w-72  h-60">
          <button className=" w-10 h-10"> down</button>
          <div>The xor dataset</div>
          <button
            onClick={() => {
              uploadFiles('XOR');
            }}
            className=" w-10 h-10"
          >
            uplo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Datasets;
