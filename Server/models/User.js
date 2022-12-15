const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  recordingID: {
    type: Array,
  },
});

module.exports = mongoose.model('users', UserSchema);
