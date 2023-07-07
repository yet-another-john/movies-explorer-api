const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequest = require('../errors/bad-request');
const Unauthorized = require('../errors/unauthorized');
const NotFoundError = require('../errors/not-found-error');
const Conflict = require('../errors/conflict');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Email already registered'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest('Invalid data'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  let user;
  User.findOne({ email }).select('+password')
    .then((userData) => {
      if (!userData) {
        return Promise.reject(new Unauthorized('Incorrect email or password'));
      }
      user = userData._id;
      return bcrypt.compare(password, userData.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Unauthorized('Incorrect email or password'));
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Not found');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const editUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findOne({ email })
    .then((userData) => {
      if (userData) {
        throw new BadRequest('Email already in use');
      }
      User.findByIdAndUpdate(
        req.user._id,
        { email, name },
        { new: true, runValidators: true, upsert: false },
      )
        .orFail(() => {
          throw new NotFoundError('Not found');
        })
        .then((user) => {
          res.send(user);
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Invalid data'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser, login, getUserInfo, editUser,
};
