import React from 'react';
import Popup from './OptionsPanels/Right/Popup';
import { useState } from 'react';

const NetworkButton = ({
  saveNetwork,
  clearNetwork,
  loadNetwork,
  index,
  name,
}) => {
  const [showSave, setShowSave] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [showClear, setShowClear] = useState(false);

  let flipSave = () => {
    setShowSave((e) => !e);
    if (showLoad) {
      setShowLoad(false);
    }
    if (showClear) {
      setShowClear(false);
    }
  };

  let flipLoad = () => {
    setShowLoad((e) => !e);
    if (showSave) {
      setShowSave(false);
    }
    if (showClear) {
      setShowClear(false);
    }
  };

  let flipClear = () => {
    setShowClear((e) => !e);
    if (showSave) {
      setShowSave(false);
    }
    if (showLoad) {
      setShowLoad(false);
    }
  };
  return (
    <div className="mt-6">
      <div className="flex justify-center align-middle  m-2">
        <button className="text-xl font-light">{name}</button>
      </div>
      <div className="flex justify-center">
        <div className="relative">
          <button
            className="m-2 relative font-extralight opacity-60 hover:opacity-100 transition"
            onClick={() => {
              flipSave();
            }}
          >
            save
          </button>
          {showSave && (
            <Popup
              text={'are you sure you want to save?'}
              option={'save'}
              callbackForward={() => {
                saveNetwork(index);
              }}
              callbackCancel={() => {
                flipSave();
              }}
            />
          )}
        </div>

        <div className="relative">
          <button
            className="m-2 font-extralight opacity-60 hover:opacity-100 transition"
            onClick={() => {
              flipLoad();
            }}
          >
            load
          </button>
          {showLoad && (
            <Popup
              text={'are you sure you want to load?'}
              option={'load'}
              callbackForward={() => {
                loadNetwork(index);
              }}
              callbackCancel={() => {
                flipLoad();
              }}
            />
          )}
        </div>
        <div className="relative">
          <button
            className="m-2 font-extralight opacity-60 hover:opacity-100 transition"
            onClick={() => {
              flipClear();
            }}
          >
            clear
          </button>
          {showClear && (
            <Popup
              text={'are you sure you want to clear?'}
              option={'clear'}
              callbackForward={() => {
                clearNetwork(index);
              }}
              callbackCancel={() => {
                flipClear();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkButton;
