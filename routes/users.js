const { celebrate, Joi } = require('celebrate');
const users = require('express').Router();
const { getUserInfo, editUser } = require('../controllers/users');

users.get('/users/me', getUserInfo);

users.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), editUser);

module.exports = users;
