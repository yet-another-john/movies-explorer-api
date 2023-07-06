const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const Forbidden = require('../errors/forbidden');
const BadRequest = require('../errors/bad-request');

const getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  Movie.create({
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailerLink: req.body.trailerLink,
    thumbnail: req.body.thumbnail,
    owner: req.user._id,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
    movieId: req.body.movieId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Invalid data'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Not found');
    })
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        throw new Forbidden('Forbidden');
      }
      Movie.findByIdAndRemove(req.params.id)
        .orFail(() => {
          throw new NotFoundError('Not found');
        })
        .then((deletedMovie) => {
          res.send(deletedMovie);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Invalid data'));
      } else {
        next(err);
      }
    });
};

module.exports = { getAllMovies, createMovie, deleteMovie };
