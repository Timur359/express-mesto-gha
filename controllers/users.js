const userSchema = require("../models/user");

const getUsers = (req, res, next) => {
  userSchema
    .find()
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res.status(500).send({ message: "Произошла непредвиденная ошибка =(" });
      next(err);
    });
};

const getProfile = (req, res, next) => {
  userSchema
    .findById(req.params.userId)
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      res.status(404).send({ message: "Пользователь не найден !" });
      next(err);
    });
};

const createUsers = (req, res, next) => {
  const { name, about, avatar } = req.body;
  // eslint-disable-next-line new-cap
  const user = new userSchema({ name, about, avatar });
  user
    .save()
    .then((result) => {
      res.status(200).send({ data: result });
    })
    .catch((err) => {
      res.status(400).send({
        message: "Введите необходимые данные. Все поля должны быть корректны !",
      });
      next(err);
    });
};

const editUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  userSchema
    .findByIdAndUpdate(req.user._id, { name, about })
    .then((result) => {
      res.status(200).send(`Пользователь ${result.name} изменён !`);
    })
    .catch((err) => {
      res.status(400).send({ message: "Все поля должны быть корректны !" });
      next(err);
    });
};

const editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  userSchema
    .findByIdAndUpdate(req.user._id, { avatar })
    .then((result) => {
      res.status(200).send(`Аватар пользователя ${result.name} изменён !`);
    })
    .catch((err) => {
      res.status(400).send({ message: "Все поля должны быть корректны !" });
      next(err);
    });
};

module.exports = {
  getUsers,
  getProfile,
  createUsers,
  editUserProfile,
  editUserAvatar,
};
