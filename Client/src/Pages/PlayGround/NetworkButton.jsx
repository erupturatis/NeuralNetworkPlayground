import React from 'react';
import download from '../../assets/download.svg';

const NetworkButton = ({ saveNetwork, clearNetwork, index }) => {
  return (
    <div className="border-2">
      <div className="flex justify-center align-middle  m-2">
        <button>Network1</button>
        <button className="border-2">
          <img src={download} width={30} height={30} />
        </button>
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
        <button className="m-2">load</button>
        <button
          className="m-2"
          onClick={() => {
            console.log('clearng');
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
