const express = require('express');
const mongoose = require('mongoose');
const routerUser = require('./routes/users');
const routerCards = require('./routes/cards');
const { ERROR_NOT_FOUND } = require('./errors/errors');
const { MSG_ERROR_NOT_FOUND } = require('./errors/errors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '648739c3a7b0503a88bbcb49',
  };
  next();
});

app.use(express.json());
app.use(routerUser);
app.use(routerCards);
routerCards.use((req, res) => res.status(ERROR_NOT_FOUND).send({ message: MSG_ERROR_NOT_FOUND }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // Если всё работает, консоль покажет, какой порт приложение слушает
});
