const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const networkSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  networkArhitecture: {
    type: Object,
    required: true,
  },
  recording: {
    type: Object,
    required: false,
  },
});

module.exports = mongoose.model('networks', networkSchema);
