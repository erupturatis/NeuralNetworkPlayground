import * as tf from '@tensorflow/tfjs';
import { mode } from 'd3';
import { transpose } from './utils';

import { initializeRecording, addSnapshot } from '../../../store/recording';

import { store } from '../../../store/store';
import { changeSaved } from '../../../store/recording';
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
    this.model = tf.sequential();
  }

  initRecording() {
    store.dispatch(
      initializeRecording({
        network: this.network,
        inputs: this.inputsProcessed,
        outputs: this.outputProcessed,
      })
    );
  }

  saveSnapshotCallback() {
    // saving a snapshot of the network at a specific iteration
    store.dispatch(addSnapshot());
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

  networkPreprocessing() {
    let length = this.network.length;
    let activation = this.network.activation;
    let loss = this.network.loss;
    let learningRate = this.network.learningRate;

    this.model.add(
      tf.layers.dense({
        units: this.network.layers[1].numNeurons,
        inputShape: [this.network.layers[0].numNeurons],
        activation,
      })
    );
    // hidden layers
    for (let layerIdx = 2; layerIdx < this.network.length - 1; layerIdx++) {
      this.model.add(
        tf.layers.dense({
          units: this.network.layers[layerIdx].numNeurons,
          activation,
        })
      );
    }
    //ouput layer
    this.model.add(
      tf.layers.dense({
        units: this.network.layers[length - 1].numNeurons,
        activation,
      })
    );
    //syncing weights

    for (
      let layerIdx = 0;
      layerIdx < this.network.layers.length - 1;
      layerIdx++
    ) {
      let valuesWeights = this.network.connections[layerIdx].map((element) =>
        element.map((el) => el.value)
      );
      let valuesBiases = this.network.biasesWeights[layerIdx + 1];

      let replaceTensorWeights = tf.tensor(valuesWeights);
      let replaceBiasesWeights = tf.tensor(valuesBiases);

      this.model.layers[layerIdx].setWeights([
        replaceTensorWeights,
        replaceBiasesWeights,
      ]);
    }

    //training this.model on csv data
    this.processData();
    this.initRecording();

    this.inputData = tf.tensor(this.inputsProcessed[0]);
    this.outputData = tf.tensor(this.outputProcessed[0]);

    this.model.compile({
      optimizer: tf.train.adam(learningRate),
      loss,

      metrics: ['accuracy'],
    });
  }

  change() {
    store.dispatch(changeRun());
  }

  async runNetwork() {
    // let length = this.network.length;
    // getting activation

    let epochs = this.network.epochs;
    let model = this.model;

    let inputsNum = this.network.layers[0].numNeurons;
    let outputsNum = this.network.layers[this.network.length - 1].numNeurons;
    // this.networkPreprocessing();

    try {
      this.networkPreprocessing();
    } catch (err) {
      store.dispatch(changeRun());
      return err;
    }

    if (inputsNum !== this.inputsProcessed[1].length) {
      store.dispatch(changeRun());

      return "input neurons don't match input data";
    }
    if (outputsNum !== this.outputProcessed[1].length) {
      store.dispatch(changeRun());

      return "output neurons don't match output data";
    }

    // network preprocessing

    let recordFrequency = this.network.recordFreq;

    let res = await model.fit(this.inputData, this.outputData, {
      epochs: epochs + 1,
      batchSize: 10,
      shuffle: true,
      callbacks: {
        onEpochEnd: async (epoch, params) => {
          // console.log(epoch, params.loss);
          if (epoch % recordFrequency == 0) {
            this.epoch = epoch;
            this.model = model;
            this.loss = params.loss;
            console.log(this.loss);
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
    store.dispatch(setFill(this.network.epochs));
    let storeData = store.getState();
    let lastNetwork = storeData.recording.snapshots.slice(-1)[0].network;
    store.dispatch(replaceState(lastNetwork));
    store.dispatch(changeSaved());
    store.dispatch(changeRun());

    return false;
    // setRunning(false);
    // setEpoch(epochs);
    // setFill(100);
  }
}
