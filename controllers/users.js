/* eslint-disable comma-dangle */

const User = require("../models/user");

const {
  ERROR_CODE_400,
  ERROR_CODE_404,
  hiddenError,
} = require("../errors/const");

const getUsers = (req, res) => {
  User.find()
    .then((users) => res.status(200).send(users))
    .catch(() => {
      hiddenError(res);
    });
};

const getProfile = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_CODE_404)
          .send({ message: "Пользователь не найден !" });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_CODE_400).send({ message: "Невалидный id " });
      } else {
        hiddenError(res);
      }
    });
};

const createUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  const user = new User({ name, about, avatar });
  user
    .save()
    .then((result) => {
      res.status(200).send({ data: result });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE_400).send({ message: "Некорректные данные" });
      } else {
        hiddenError(res);
      }
    });
};

const editUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((result) => {
      res.status(200).send({ data: result });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE_400).send({ message: "Некорректные данные" });
      } else {
        hiddenError(res);
      }
    });
};

const editUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((result) => {
      res.status(200).send({ data: result });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE_400).send({ message: "Некорректные данные" });
      } else {
        hiddenError(res);
      }
    });
};

module.exports = {
  getUsers,
  getProfile,
  createUsers,
  editUserProfile,
  editUserAvatar,
};
