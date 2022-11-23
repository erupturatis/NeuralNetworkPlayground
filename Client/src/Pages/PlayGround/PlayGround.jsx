import React, { useState } from 'react';
import LayerGenerator from './LayerGenerator';

const PlayGround = () => {
  let layers = [1];
  const [data, setdata] = useState([1, 2, 3, 4]);

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
      <svg
        id="root-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        {layers.map((element) => (
          <LayerGenerator key={element} layerNum={element} data={data} />
        ))}
      </svg>
    </div>
  );
};

export default PlayGround;
