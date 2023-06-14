const express = require('express');
const mongoose = require('mongoose');
const routerUser = require('./routes/users');
const routerCards = require('./routes/cards');

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

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // Если всё работает, консоль покажет, какой порт приложение слушает
});
