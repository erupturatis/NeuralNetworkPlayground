import React from 'react';
import download from '../../assets/download.svg';
const NetworkButton = ({
  saveNetwork,
  clearNetwork,
  loadNetwork,
  index,
  name,
}) => {
  return (
    <div className="border-2">
      <div className="flex justify-center align-middle  m-2">
        <button>{name}</button>
      </div>
      <div className="flex justify-center">
        <button
          className="m-2"
          onClick={() => {
            saveNetwork(index);
          }}
        >
          save
        </button>
        <button
          className="m-2"
          onClick={() => {
            loadNetwork(index);
          }}
        >
          load
        </button>
        <button
          className="m-2"
          onClick={() => {
            clearNetwork(index);
          }}
        >
          clear
        </button>
      </div>
    </div>
  );
};

export default NetworkButton;
