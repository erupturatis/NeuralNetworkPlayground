const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordingSchema = new Schema({
  networkArhitecture: {
    type: Object,
    //required: true,
  },
  inputData: {
    type: Array,
    //required: true,
  },
  outputData: {
    type: Array,
    //required: true,
  },
  inputDataLabels: {
    type: Array,
    //required: true,
  },
  outputDataLabels: {
    type: Array,
    //required: true,
  },
  snapshots: {
    type: Array,
    //required: true,
  },
});

module.exports = mongoose.model('recordings', recordingSchema);
