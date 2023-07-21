import React from 'react';
import Settings from './Settings';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import arrow from './assets/arrowdown.png';
const Advanced = () => {
  const { network } = useSelector((state) => state);
  const [showActivation, setShowActivation] = useState(false);
  const [showLoss, setShowLoss] = useState(false);
  const [showEpochs, setShowEpochs] = useState(false);
  const [learningRate, setShowLearningRate] = useState(false);

  const [display, setDisplay] = useState(true);

  return (
    <>
      <div className="w-full">
        <div className="  flex justify-center md:justify-start">
          <button
            onClick={() => {
              setDisplay((e) => !e);
            }}
            className="flex mt-4"
          >
            <img
              src={arrow}
              alt=""
              className={`mt-1 mb-2 w-5 h-5 transition-transform select-none ${
                display ? ' -rotate-90' : ''
              }`}
            />
            <div className=" text-lg ml-4 select-none ">Advanced settings</div>
          </button>
        </div>

        <div
          className={` transition-all mb-4  ${
            !display
              ? '  '
              : 'pointer-events-none -translate-y-10 opacity-0 z-0 absolute w-full'
          }`}
        >
          <Settings
            trigger={showActivation}
            setTrigger={() => {
              setShowActivation((e) => !e);
              if (showEpochs) {
                setShowEpochs(false);
              }
              if (showLoss) {
                setShowLoss(false);
              }
            }}
            optionsValues={['relu', 'elu', 'tanh', 'sigmoid']}
            name={'Activation'}
            value={network.activation}
            prop={'activation'}
          />
          <Settings
            trigger={showEpochs}
            setTrigger={() => {
              setShowEpochs((e) => !e);
              if (showActivation) {
                setShowActivation(false);
              }
              if (showLoss) {
                setShowLoss(false);
              }
            }}
            optionsValues={[50, 100, 250]}
            name={'Epochs'}
            value={network.epochs}
            prop={'epochs'}
          />
          <Settings
            trigger={showLoss}
            setTrigger={() => {
              setShowLoss((e) => !e);
              if (showActivation) {
                setShowActivation(false);
              }
              if (showEpochs) {
                setShowEpochs(false);
              }
            }}
            optionsValues={[
              'meanSquaredError',
              'categoricalCrossentropy',
              'meanSquaredLogarithmicError',
            ]}
            name={'Loss function'}
            value={network.loss}
            prop={'loss'}
          />
          <Settings
            trigger={learningRate}
            setTrigger={() => {
              setShowLearningRate((e) => !e);
            }}
            optionsValues={[0.05, 0.01, 0.005, 0.001, 0.0001]}
            name={'Learning rate'}
            value={network.learningRate}
            prop={'learningRate'}
          />
        </div>
      </div>
    </>
  );
};

export default Advanced;
