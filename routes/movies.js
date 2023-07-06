const { celebrate, Joi } = require('celebrate');
const movies = require('express').Router();
const { getAllMovies, createMovie, deleteMovie } = require('../controllers/movies');

movies.get('/movies', getAllMovies);

movies.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().max(30).required(),
    director: Joi.string().max(30).required(),
    duration: Joi.number().max(30).required(),
    year: Joi.string().max(30).required(),
    description: Joi.string().max(30).required(),
    image: Joi.string().required().uri().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
    trailerLink: Joi.string().required().uri().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
    thumbnail: Joi.string().required().uri().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
    nameRU: Joi.string().max(30).required(),
    nameEN: Joi.string().max(30).required(),
  }),
}), createMovie);

movies.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = movies;
