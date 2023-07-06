const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    maxlength: 30,
    required: true,
  },
  director: {
    type: String,
    maxlength: 30,
    required: true,
  },
  duration: {
    type: Number,
    maxlength: 30,
    required: true,
  },
  year: {
    type: String,
    maxlength: 30,
    required: true,
  },
  description: {
    type: String,
    maxlength: 30,
    required: true,
  },
  image: {
    type: String,
    validate: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
    required: true,
  },
  trailerLink: {
    type: String,
    validate: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
    required: true,
  },
  thumbnail: {
    type: String,
    validate: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movie',
    required: true,
  },
  nameRU: {
    type: String,
    maxlength: 30,
    required: true,
  },
  nameEN: {
    type: String,
    maxlength: 30,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
