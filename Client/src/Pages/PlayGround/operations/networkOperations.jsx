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
    if (this.inputs === undefined) {
      return;
    }
    if (this.outputs === undefined) {
      return;
    }
    if (this.network === undefined) {
      return;
    }
    //build initial network with brainjs
    //sync weights

    // here code brainjs running network
  }

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
