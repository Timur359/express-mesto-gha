/* eslint-disable new-cap */
/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */

const userSchema = require("../models/user");

const {
  ERROR_CODE_400,
  ERROR_CODE_404,
  ERROR_CODE_500,
} = require("../errors/const");

const getUsers = (req, res, next) => {
  userSchema
    .find()
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res
        .status(ERROR_CODE_500)
        .send({ message: "Произошла непредвиденная ошибка =(" });
      next(err);
    });
};

const getProfile = (req, res, next) => {
  userSchema
    .findById(req.params.userId)

    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_CODE_404)
          .send({ message: "Пользователь не найден !" });
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      res.status(ERROR_CODE_400).send({ message: "Пользователь не найден !" });
      next(err);
    });
};

const createUsers = (req, res, next) => {
  const { name, about, avatar } = req.body;
  const user = new userSchema({ name, about, avatar });
  user
    .save()
    .then((result) => {
      res.status(200).send({ data: result });
    })
    .catch((err) => {
      res.status(ERROR_CODE_400).send({
        message: "Все поля должны быть корректны !",
      });
      next(err);
    });
};

const editUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  userSchema
    .findByIdAndUpdate(
      req.user._id,
      { name, about },

      { new: true, runValidators: true }
    )
    .then((result) => {
      res.status(200).send({ data: result });
    })
    .catch((err) => {
      res
        .status(ERROR_CODE_400)
        .send({ message: "Все поля должны быть корректны !" });
      next(err);
    });
};

const editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  userSchema
    .findByIdAndUpdate(
      req.user._id,
      { avatar },

      { new: true, runValidators: true }
    )
    .then((result) => {
      res.status(200).send({ data: result });
    })
    .catch((err) => {
      res
        .status(ERROR_CODE_400)
        .send({ message: "Все поля должны быть корректны !" });
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
