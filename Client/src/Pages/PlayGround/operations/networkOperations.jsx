import * as tf from '@tensorflow/tfjs';
import { mode } from 'd3';
import { transpose } from './utils';
import {
  dispatchInitializeRecording,
  dispatchAddSnapshot,
} from '../utils/dispatchers';

import { store } from '../../../store/store';
import { changeRun, setEpoch, setFill } from '../../../store/running';
import { replaceState } from '../../../store/network';

export class Operations {
  loadRecording(recording) {
    this.recording = recording;
  }

  setParams(network, inputs, outputs, params) {
    this.network = network;
    this.inputs = inputs;
    this.outputs = outputs;
  }

  initRecording() {
    dispatchInitializeRecording({
      network: this.network,
      inputs: this.inputsProcessed,
      outputs: this.outputProcessed,
    });
  }

  loadSnapshot(iteration) {
    //loading a snapshot of a specific iteration or the
    //closest to it
  }

  saveSnapshotCallback() {
    // saving a snapshot of the network at a specific iteration
    dispatchAddSnapshot();
  }

  callWarning() {
    // call a warning to confirm we want to run
  }

  processData() {
    let inputKeys = [];
    let outputKeys = [];
    for (let key in this.inputs[0]) {
      inputKeys.push(key);
    }
    for (let key in this.outputs[0]) {
      outputKeys.push(key);
    }
    if (inputKeys.includes('__parsed_extra')) {
      inputKeys.splice(inputKeys.indexOf('__parsed_extra'), 1);
    }
    if (outputKeys.includes('__parsed_extra')) {
      outputKeys.splice(outputKeys.indexOf('__parsed_extra'), 1);
    }

    let inputData = [];
    let outputData = [];

    for (let val of this.inputs) {
      let dataRow = [];

      for (let key of inputKeys) {
        dataRow.push(parseFloat(val[key]));
      }
      inputData.push(dataRow);
    }

    for (let val of this.outputs) {
      let dataRow = [];

      for (let key of outputKeys) {
        dataRow.push(parseFloat(val[key]));
      }
      outputData.push(dataRow);
    }
    this.inputsProcessed = [inputData, inputKeys];
    this.outputProcessed = [outputData, outputKeys];
  }

  async runNetwork(options) {
    const model = tf.sequential();
    // let length = this.network.length;
    // getting activation
    let length = this.network.length;
    let activation = this.network.activation;
    let loss = this.network.loss;
    let epochs = this.network.epochs;

    // generating model
    // input layer
    model.add(
      tf.layers.dense({
        units: this.network.layers[1].numNeurons,
        inputShape: [this.network.layers[0].numNeurons],
        activation,
      })
    );
    // hidden layers
    for (let layerIdx = 2; layerIdx < this.network.length - 1; layerIdx++) {
      model.add(
        tf.layers.dense({
          units: this.network.layers[layerIdx].numNeurons,
          activation,
        })
      );
    }
    //ouput layer
    model.add(
      tf.layers.dense({
        units: this.network.layers[length - 1].numNeurons,
        activation,
      })
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

    //training model on csv data
    this.processData();
    this.initRecording();

    let inputData = tf.tensor(this.inputsProcessed[0]);
    let outputData = tf.tensor(this.outputProcessed[0]);

    model.compile({
      optimizer: tf.train.adam(0.1),
      loss,
      metrics: ['accuracy'],
    });
    store.dispatch(changeRun());

    let recordFrequency = 2;
    // getting initial loss
    let initialPred = model.predict(inputData, outputData);
    let lossInit = tf.losses.meanSquaredError(initialPred, outputData);
    let lossVal = lossInit.arraySync();

    this.epoch = 0;
    this.model = model;
    this.loss = lossVal;
    // saving model snapshot
    this.saveSnapshotCallback();

    let res = await model.fit(inputData, outputData, {
      epochs,
      batchSize: 12,
      callbacks: {
        onEpochEnd: async (epoch, params) => {
          if (epoch % recordFrequency == 0) {
            this.epoch = epoch;
            this.model = model;
            this.loss = params.loss;
            // saving model snapshot
            this.saveSnapshotCallback();
            let storeData = store.getState();
            let lastNetwork =
              storeData.recording.snapshots.slice(-1)[0].network;
            store.dispatch(replaceState(lastNetwork));
          }

          store.dispatch(setEpoch(epoch));
          store.dispatch(setFill(parseInt((epoch * 100) / epochs)));
          // setFill(parseInt(epoch / epochs));
          // setEpoch(epoch);
          await tf.nextFrame();
        },
      },
    });
    store.dispatch(setEpoch(epochs));
    store.dispatch(setFill(100));
    store.dispatch(changeRun());
    let storeData = store.getState();
    let lastNetwork = storeData.recording.snapshots.slice(-1)[0].network;
    store.dispatch(replaceState(lastNetwork));
    // setRunning(false);
    // setEpoch(epochs);
    // setFill(100);
  }
}
