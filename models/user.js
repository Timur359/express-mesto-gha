const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Лучше написать своё имя",
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Я знаю, что вы сделали прошлым летом",
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
