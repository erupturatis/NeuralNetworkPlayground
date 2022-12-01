import { useEffect } from 'react';
import NetworkGenerator from './NetworkGenerator';
import OptionsLeft from './OptionsLeft';
import OptionsTop from './OptionsTop';
import { Layer, Network } from 'synaptic';
import * as brain from 'brain.js';
const PlayGround = () => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  // useEffect(() => {
  //   let _Data = [
  //     { input: [1, 1], output: [2] },
  //     { input: [0, 1], output: [1] },
  //     { input: [1, 0], output: [1] },
  //     { input: [0, 0], output: [0] },
  //   ];

  //   let net = new brain.NeuralNetwork({
  //     inputSize: 2,
  //     hiddenLayers: [3],
  //     outputSize: 1,
  //     activation: 'leaky-relu',
  //   });
  //   //net.run(_Data[0].input);

  //   let res = net.train(_Data, { iterations: 1 });
  //   console.log(res);
  //   console.log(net.run);
  //   console.log(net);
  //   res = net.train(_Data, { iterations: 1000 });
  //   console.log(res);
  //   console.log(net.run(_Data[0].input));

  //   console.log(net);
  // }, []);

  useEffect(() => {
    // create the network
    var inputLayer = new Layer(2);
    var hiddenLayer = new Layer(6);
    var outputLayer = new Layer(1);

    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    var myNetwork = new Network({
      input: inputLayer,
      hidden: [hiddenLayer],
      output: outputLayer,
    });

    // train the network
    var learningRate = 0.3;
    console.log(myNetwork);
    for (var i = 0; i < 20000; i++) {
      // 0,0 => 0
      myNetwork.activate([0, 0]);
      myNetwork.propagate(learningRate, [0]);

      // 0,1 => 1
      myNetwork.activate([0, 1]);
      myNetwork.propagate(learningRate, [1]);

      // 1,0 => 1
      myNetwork.activate([1, 0]);
      myNetwork.propagate(learningRate, [1]);

      // 1,1 => 0
      myNetwork.activate([1, 1]);
      myNetwork.propagate(learningRate, [0]);
    }
    console.log(myNetwork);
    // test the network
    console.log(myNetwork.activate([0, 0]));
    console.log(myNetwork.activate([0, 1]));
    console.log(myNetwork.activate([1, 0]));
    console.log(myNetwork.activate([1, 1]));
  }, []);

  return (
    <div id="graph-container" className="w-full h-full ">
      <div className=" text-white left-0 absolute h-full  w-64 border-2 ">
        <OptionsLeft />
      </div>
      <div className=" text-white left-64 absolute h-48  w-full border-2 ">
        <OptionsTop />
      </div>
      <div className="w-full h-full">
        <svg
          id="root-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <g id="root-group">
            <NetworkGenerator />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default PlayGround;
