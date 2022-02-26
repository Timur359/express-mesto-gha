const cardSchema = require("../models/card");

const getCards = (req, res, next) => {
  cardSchema
    .find()
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res.status(500).send({ message: "Произошла непредвиденная ошибка =(" });
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  // eslint-disable-next-line new-cap
  const card = new cardSchema({ name, link });
  card
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

const deleteCard = (req, res, next) => {
  cardSchema
    .findByIdAndDelete(req.params.cardId)
    .then((result) => {
      res.status(200).send({ data: result });
    })
    .catch((err) => {
      res.status(404).send({ message: "Карточка не найдена !" });
      next(err);
    });
};

const likeCard = (req, res, next) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      // eslint-disable-next-line comma-dangle
      { new: true }
    )
    .then((result) => {
      res.status(200).send({ data: result });
    })
    .catch((err) => {
      res.status(404).send({ message: "Карточка не найдена !" });
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      // eslint-disable-next-line comma-dangle
      { new: true }
    )
    .then((result) => {
      res.status(200).send({ data: result });
    })
    .catch((err) => {
      res.status(400).send({ message: "Карточка не найдена !" });
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
