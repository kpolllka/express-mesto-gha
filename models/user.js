const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'минимальная длина поля "name" - 2 символа'],
    maxlength: [30, 'максимальная длина поля "name" - 30 символов'],
    required: [true, 'поле "name" должно быть заполнено'],
  },
  about: {
    type: String,
    minlength: [2, 'минимальная длина поля "about" - 2 символа'],
    maxlength: [30, 'максимальная длина поля "about" - 30 символов'],
    required: [true, 'поле "about" должно быть заполнено'],
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
