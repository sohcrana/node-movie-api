const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  director_id: Schema.Types.ObjectId,
  title: {
    type: String,
    unique: true,
    required: [true, '{PATH} can\'t be empty.']
  },
  category: String,
  country: String,
  year: Number,
  imdb_rating: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('movie', MovieSchema);