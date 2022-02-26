/* eslint-disable new-cap */
/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */

const cardSchema = require("../models/card");

const {
  ERROR_CODE_400,
  ERROR_CODE_404,
  ERROR_CODE_500,
} = require("../errors/const");

const getCards = (req, res, next) => {
  cardSchema
    .find()
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res
        .status(ERROR_CODE_500)
        .send({ message: "Произошла непредвиденная ошибка =(" });
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const card = new cardSchema({ name, link });
  card
    .save()
    .then((result) => {
      res.status(200).send({ data: result });
    })
    .catch((err) => {
      res.status(ERROR_CODE_400).send({
        message: "Введите необходимые данные. Все поля должны быть корректны !",
      });
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  cardSchema
    .findByIdAndDelete(req.params.cardId)
    .then((result) => {
      if (!result) {
        return res
          .status(ERROR_CODE_404)
          .send({ message: "Карточка не найдена !" });
      }
      res.status(200).send({ data: result });
    })
    .catch((err) => {
      res.status(ERROR_CODE_400).send({ message: "Карточка не найдена !" });
      next(err);
    });
};

const likeCard = (req, res, next) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .then((result) => {
      if (!result) {
        return res
          .status(ERROR_CODE_404)
          .send({ message: "Карточка не найдена !" });
      }
      res.status(200).send({ data: result });
    })
    .catch((err) => {
      res.status(ERROR_CODE_400).send({ message: "Карточка не найдена !" });
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .then((result) => {
      if (!result) {
        return res
          .status(ERROR_CODE_404)
          .send({ message: "Карточка не найден !" });
      }
      res.status(200).send({ data: result });
    })
    .catch((err) => {
      res.status(ERROR_CODE_400).send({ message: "Карточка не найдена !" });
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
