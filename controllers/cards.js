const Card = require("../models/card");

const {
  ERROR_CODE_400,
  ERROR_CODE_404,
  hiddenError,
} = require("../errors/hiddenError");
const { notFoundError } = require("../errors/notFoundError");

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
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE_400).send({ message: "Некорректные данные" });
      } else {
        hiddenError(err);
      }
    });
};

const deleteCard = (req, res) => {
  const owner = req.user._id;
  Card.findOne({ _id: req.params.cardId })
    .orFail(() => notFoundError(res, "Карточка не найдена"))
    .then((card) => {
      if (!card.owner.equals(owner)) {
        res.status(400).send("Нет прав на удаление этой карточки !");
      } else {
        Card.deleteOne(card).then(() => res.status(200).send({ data: card }));
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

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
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
    { new: true },
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
