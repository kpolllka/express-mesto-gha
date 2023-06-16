const Card = require('../models/card');

const {
  STATUS_CREATE,
  ERROR_CODE,
  ERROR_NOT_FOUND,
  ERROR_SERVER,
  MSG_ERROR_CODE,
  MSG_ERROR_NOT_FOUND,
  MSG_ERROR_SERVER,
} = require('../errors/errors');

// Создание новой карточки
const createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerID = req.user._id;

  Card.create({ name, link, owner: ownerID })
    .then((card) => res.status(STATUS_CREATE).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: MSG_ERROR_CODE + err.message });
      } else {
        res.status(ERROR_SERVER).send({ message: MSG_ERROR_SERVER + err.message });
      }
    });
};

// Получение всех карточек
const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.status(ERROR_SERVER).send({ message: MSG_ERROR_SERVER + err.message });
    });
};

// Удаление карточки
const delCard = (req, res) => {
  const cardId = req.params._id;

  Card.findByIdAndRemove(cardId)
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
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

// Лайк карточки
const likeCard = (req, res) => {
  const ownerID = req.user._id;
  const cardId = req.params._id;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: ownerID } }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
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

// Дизлайк карточки
function dislikeCard(req, res) {
  const ownerID = req.user._id;
  const cardId = req.params._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: ownerID } }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: MSG_ERROR_CODE + err.message });
      } else if (err.message === 'NotValidId') {
        res.status(ERROR_NOT_FOUND).send({ message: MSG_ERROR_NOT_FOUND });
        return;
      }
      res.status(ERROR_SERVER).send({ message: MSG_ERROR_SERVER + err.message });
    });
}

module.exports = {
  createCard, getCards, delCard, likeCard, dislikeCard,
};
