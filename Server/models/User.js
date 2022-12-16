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
  authType: {
    type: String,
    required: true,
  },
  recordingID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'recordings' }],
});

module.exports = mongoose.model('users', UserSchema);
