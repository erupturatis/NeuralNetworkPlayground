import React, { useState } from 'react';
import NetworkGenerator from './NetworkGenerator';
import { useDispatch, useSelector } from 'react-redux';
import { addNeuron } from '../../redux/network';

const PlayGround = () => {
  const { network } = useSelector((state) => state.network);
  const dispatch = useDispatch();
  return (
    <div id="graph-container" className="w-screen h-screen p-40">
      <button
        className="w-10 h-10 bg-white"
        onClick={() => {
          setdata((prevdata) => {
            console.log(prevdata);
            return [...prevdata, 1];
          });
        }}
      ></button>
      <button
        className=" bg-white"
        onClick={() => {
          dispatch(addNeuron(0));
        }}
      >
        Add neuron
      </button>
      <svg
        id="root-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <NetworkGenerator />
      </svg>
    </div>
  );
};

export default PlayGround;
