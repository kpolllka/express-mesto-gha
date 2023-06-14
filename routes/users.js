const routerUser = require('express').Router();
const {
  createUser, getUsers, getUserId, editUser, editAvatar,
} = require('../controllers/users');

routerUser.post('/users', createUser); // Создаём пользователя
routerUser.get('/users', getUsers); // Получаем всех пользователей
routerUser.get('/users/:_id', getUserId); // Получаем пользователя по ID
routerUser.patch('/users/me', editUser); // Редактируем данные пользователя
routerUser.patch('/users/me/avatar', editAvatar); // Редактируем аватар пользователя

module.exports = routerUser;
