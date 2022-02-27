/* eslint-disable comma-dangle */

const Card = require("../models/card");

const {
  ERROR_CODE_400,
  ERROR_CODE_404,
  hiddenError,
} = require("../errors/const");

const getCards = (req, res) => {
  Card.find()
    .then((users) => res.status(200).send(users))
    .catch(() => {
      hiddenError(res);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  const card = new Card({ name, link, owner });
  card
    .save()
    .then((result) => {
      res.status(200).send({ data: result });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE_400).send({ message: "Некорректные данные" });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((result) => {
      if (!result) {
        res.status(ERROR_CODE_404).send({ message: "Карточка не найдена !" });
      } else {
        res.status(200).send({ data: result });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_CODE_400).send({ message: "Невалидный id " });
      } else {
        hiddenError(err);
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        res.status(ERROR_CODE_404).send({ message: "Карточка не найдена !" });
      } else {
        res.status(200).send({ data: result });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_CODE_400).send({ message: "Невалидный id " });
      } else {
        hiddenError(err);
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        res.status(ERROR_CODE_404).send({ message: "Карточка не найден !" });
      } else {
        res.status(200).send({ data: result });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_CODE_400).send({ message: "Невалидный id " });
      } else {
        hiddenError(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
