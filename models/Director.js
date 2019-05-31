const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: [30, '{PATH} can\'t be longer than {MAXLENGTH} chars.'],
    minlength: [2, '{PATH} can\'t be shorter than {MINLENGTH} chars.']
  },
  surname: {
    type: String,
    required: true,
    maxlength: [30, '{PATH} can\'t be longer than {MAXLENGTH} chars.'],
    minlength: [2, '{PATH} can\'t be shorter than {MINLENGTH} chars.']
  },
  country: String,
  bio: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('director', DirectorSchema);