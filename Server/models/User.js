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
  networkID: {
    type: [{ type: String, ref: 'networks' }],
    default: ['0', '0', '0'],
  },
});

module.exports = mongoose.model('users', UserSchema);
