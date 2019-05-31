const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, '{PATH} can\'t be empty.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, '{PATH} can\'t be empty.'],
    minlength: [6, '{PATH} can\'t be shorter than {MINLENGTH} chars.'],
    maxlength: [24, '{PATH} can\'t be longer than {MAXLENGTH} chars.']
  }
});

module.exports = mongoose.model('user', UserSchema);