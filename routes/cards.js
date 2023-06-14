const routerCards = require('express').Router();
const {
  createCard, getCards, delCard, likeCard, dislikeCard,
} = require('../controllers/cards');
// const { ERROR_NOT_FOUND } = require('../errors/errors');
// const { MSG_ERROR_NOT_FOUND } = require('../errors/errors');

routerCards.post('/cards', createCard); // Создаем новую карточку
routerCards.get('/cards', getCards); // Получаем все карточки
routerCards.delete('/cards/:_id', delCard); // Удаляем карточку
routerCards.put('/cards/:_id/likes', likeCard); // Лайк карточки
routerCards.delete('/cards/:_id/likes', dislikeCard); // Дизлайк карточки

// routerCards.use('/*', (req, res) => res.status(ERROR_NOT_FOUND).send({ message: MSG_ERROR_NOT_FOUND }));

module.exports = routerCards;
