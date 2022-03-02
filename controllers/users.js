const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const {
  ERROR_CODE_400,
  ERROR_CODE_404,
  hiddenError,
} = require("../errors/hiddenError");
const { notFoundError } = require("../errors/notFoundError");

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

const getMyProfile = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        notFoundError(res, "Данные пользователя не найдены");
      }
      res.status(200).send(user);
    })
    .catch(() => hiddenError(res, "Произошла непредвиденная ошибка"));
};

const createUsers = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    notFoundError(res, "Не переданы email или пароль");
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "MongoServerError" && err.code === 11000) {
        res
          .status(409)
          .send({ message: "Пользователь с данным email уже зарегестрирован" });
      } else {
        hiddenError(res);
      }
    });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });
      return res.status(200).send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const editUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
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
    { new: true, runValidators: true },
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
  loginUser,
  getMyProfile,
};
