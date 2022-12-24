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
  const [display, setDisplay] = useState(false);

  return (
    <>
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
        </div>
      </div>
    </>
  );
};

export default Advanced;
