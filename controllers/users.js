const userSchema = require("../models/user");

const getUsers = (req, res, next) => {
  userSchema
    .find()
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res.status(500).send({ message: "Произошла непредвиденная ошибка =(" });
      console.log(err);
    });
};

const getProfile = (req, res) => {
  userSchema
    .findById(req.params.userId)
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      res.status(404).send({ message: "Пользователь не найден !" });
      console.log(err);
    });
};

const createUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  const user = new userSchema({ name, about, avatar });
  user
    .save()
    .then((result) => res.status(200).send("Пользователь добавлен !"))
    .catch((err) => {
      res.status(400).send({
        message: "Введите необходимые данные. Все поля должны быть корректны !",
      });
      console.log(err);
    });
};

const editUserProfile = (req, res) => {
  const { name, about } = req.body;
  userSchema
    .findByIdAndUpdate(req.user._id, { name, about })
    .then((result) => res.status(200).send("Пользователь изменён !"))
    .catch((err) => {
      res.status(400).send({ message: "Все поля должны быть корректны !" });
      console.log(err);
    });
};

const editUserAvatar = (req, res) => {
  const { avatar } = req.body;
  userSchema
    .findByIdAndUpdate(req.user._id, { avatar })
    .then((result) => res.status(200).send("Аватар изменён !"))
    .catch((err) => {
      res.status(400).send({ message: "Все поля должны быть корректны !" });
      console.log(err);
    });
};

module.exports = {
  getUsers,
  getProfile,
  createUsers,
  editUserProfile,
  editUserAvatar,
};
