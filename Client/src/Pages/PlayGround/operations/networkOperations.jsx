import * as tf from '@tensorflow/tfjs';
import { mode } from 'd3';
import { transpose } from './utils';
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
    const model = tf.sequential();
    let length = this.network.length;
    model.add(
      tf.layers.dense({
        units: this.network.layers[1].numNeurons,
        inputShape: [this.network.layers[0].numNeurons],
      })
    );
    for (let layerIdx = 2; layerIdx < this.network.length - 1; layerIdx++) {
      model.add(
        tf.layers.dense({ units: this.network.layers[layerIdx].numNeurons })
      );
    }
    model.add(
      tf.layers.dense({ units: this.network.layers[length - 1].numNeurons })
    );

    //syncing weights
    for (let layerIdx = 0; layerIdx < model.layers.length; layerIdx++) {
      let valuesWeights = this.network.connections[layerIdx].map((element) =>
        element.map((el) => el.value)
      );
      let valuesBiases = this.network.biasesWeights[layerIdx + 1];

      let replaceTensorWeights = tf.tensor(valuesWeights);
      let replaceBiasesWeights = tf.tensor(valuesBiases);

      model.layers[layerIdx].setWeights([
        replaceTensorWeights,
        replaceBiasesWeights,
      ]);
    }
  }
}
