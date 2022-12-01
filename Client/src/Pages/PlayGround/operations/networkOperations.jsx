import * as brain from 'brain.js';

export class Operations {
  loadRecording(recording) {
    this.recording = recording;
  }

  setParams(network, inputs, outputs, params) {
    this.network = network;
    this.inputs = inputs;
    this.outputs = outputs;
    this.params = params;
  }

  loadSnapshot(iteration) {
    //loading a snapshot of a specific iteration or the
    //closest to it
  }

  saveSnapshot(network, iteration) {
    // saving a snapshot of the network at a specific iteration
    // in the recording store
  }

  callWarning() {
    // call a warning to confirm we want to run
  }
  runNetwork(options) {
    if (this.recording !== undefined) {
      this.callWarning();
      return;
    }
    //build initial network with brainjs
    let hidden = this.network.layers.map((element) => element.numNeurons);
    let outputSize = hidden.pop();
    let inputSize = hidden.splice(0, 1);
    inputSize = inputSize[0];

    let _Data = [
      { input: [0, 0], output: [0] },
      { input: [0, 1], output: [1] },
      { input: [1, 0], output: [1] },
      { input: [1, 1], output: [0] },
    ];

    let net = new brain.NeuralNetwork({
      inputSize: 2,
      hiddenLayers: [10, 5],
      outputSize: 1,
      activation: 'relu',
    });

    console.log(net);
    let res = net.train(_Data);
    console.log(net);
    console.log(res);
  }

  dummy = () => {
    let newWeights = net.weights;
    // newWeights[i][j][k] represents connection from layer i-1 to i
    // between neuron j in layer2 and k in first layer

    let newConn = [];

    // linearizing connection data
    for (let layer = 0; layer < this.network.length - 1; layer++) {
      let layerConn = this.network.connections[layer];
      for (let conn of layerConn) {
        newConn.push(...conn);
      }
    }
    console.log(newWeights, newConn);
    for (let conn of newConn) {
      const { value, layer2, neuron1, neuron2 } = conn;
      newWeights[layer2][neuron2][neuron1] = value;
    }
    console.log(newWeights);
    console.log(this.network);
    //sync weights

    // here code brainjs running network

    console.log(net.run([0, 0]));
    console.log(net.run([1, 0]));
    console.log(net.run([0, 1]));
    console.log(net.run([1, 1]));
  };

  runNetwork0 = (inputs) => {
    let processedInputs = [];
    for (let key in inputs) {
      processedInputs.push(inputs[key]);
    }

    const net = new brain.NeuralNetwork({
      hiddenLayers: [3],
      activation: 'sigmoid',
    });
    let _Data = [
      { input: [0, 0], output: [0] },
      { input: [0, 1], output: [1] },
      { input: [1, 0], output: [1] },
      { input: [1, 1], output: [0] },
    ];
    for (let i = 0; i < 1000; i++) {
      net.train(_Data, { iterations: 5 });
    }
    // let res = net.train(_Data);

    console.log(net.run([0, 0]));
    console.log(net.run([1, 0]));
    console.log(net.run([0, 1]));
    console.log(net.run([1, 1]));
  };
}
