const User = require('../models/user');

const {
  STATUS_CREATE,
  ERROR_CODE,
  ERROR_NOT_FOUND,
  ERROR_SERVER,
  MSG_ERROR_CODE,
  MSG_ERROR_NOT_FOUND,
  MSG_ERROR_SERVER,
} = require('../errors/errors');

// Создание нового пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_CREATE).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: MSG_ERROR_CODE + err.message });
      } else {
        res.status(ERROR_SERVER).send({ message: MSG_ERROR_SERVER + err.message });
      }
    });
};

// Получение всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(ERROR_SERVER).send({ message: MSG_ERROR_SERVER + err.message });
    });
};

// Получение пользователя по ID
const getUserId = (req, res) => {
  const userId = req.params._id;

  User.findById(userId)
    .orFail(new Error('NotValidId'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: MSG_ERROR_CODE + err.message });
      } else if (err.message === 'NotValidId') {
        res.status(ERROR_NOT_FOUND).send({ message: MSG_ERROR_NOT_FOUND });
        return;
      }
      res.status(ERROR_SERVER).send({ message: MSG_ERROR_SERVER + err.message });
    });
};

// Изменение данных пользователя
const editUser = (req, res) => {
  const { name, about } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: MSG_ERROR_CODE + err.message });
      } else if (err.message === 'NotValidId') {
        res.status(ERROR_NOT_FOUND).send({ message: MSG_ERROR_NOT_FOUND });
        return;
      }
      res.status(ERROR_SERVER).send({ message: MSG_ERROR_SERVER + err.message });
    });
};

// Изменение аватара пользователя
const editAvatar = (req, res) => {
  const { avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { avatar }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: MSG_ERROR_CODE + err.message });
      } else if (err.message === 'NotValidId') {
        res.status(ERROR_NOT_FOUND).send({ message: MSG_ERROR_NOT_FOUND });
        return;
      }
      res.status(ERROR_SERVER).send({ message: MSG_ERROR_SERVER + err.message });
    });
};

module.exports = {
  createUser, getUsers, getUserId, editUser, editAvatar,
};
