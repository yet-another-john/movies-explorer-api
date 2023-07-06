const { celebrate, Joi } = require('celebrate');
const users = require('express').Router();
const { getUserInfo, editUser } = require('../controllers/users');

users.get('/users/me', getUserInfo);

users.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
  }),
}), editUser);

module.exports = users;
