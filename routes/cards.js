const routerCards = require('express').Router();
const {
  createCard, getCards, delCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routerCards.post('/cards', createCard); // Создаем новую карточку
routerCards.get('/cards', getCards); // Получаем все карточки
routerCards.delete('/cards/:_id', delCard); // Удаляем карточку
routerCards.put('/cards/:_id/likes', likeCard); // Лайк карточки
routerCards.delete('/cards/:_id/likes', dislikeCard); // Дизлайк карточки

module.exports = routerCards;
