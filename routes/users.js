const routerUser = require('express').Router();
const {
  createUser, getUsers, getUserId, editUser, editAvatar,
} = require('../controllers/users');
// const { ERROR_NOT_FOUND } = require('../errors/errors');
// const { MSG_ERROR_NOT_FOUND } = require('../errors/errors');

routerUser.post('/users', createUser); // Создаём пользователя
routerUser.get('/users', getUsers); // Получаем всех пользователей
routerUser.get('/users/:_id', getUserId); // Получаем пользователя по ID
routerUser.patch('/users/me', editUser); // Редактируем данные пользователя
routerUser.patch('/users/me/avatar', editAvatar); // Редактируем аватар пользователя

// routerUser.use('/*', (req, res) => res.status(ERROR_NOT_FOUND).send({ message: 'Страница' }));
// routerUser.use('/*', (req, res) => res.status(ERROR_NOT_FOUND));

module.exports = routerUser;
