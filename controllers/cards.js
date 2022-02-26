const cardSchema = require("../models/card");

const getCards = (req, res) => {
  cardSchema
    .find()
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res.status(500).send({ message: "Произошла непредвиденная ошибка =(" });
      console.log(err);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const card = new cardSchema({ name, link });
  card
    .save()
    .then((result) => {
      res.status(200).send("Карточка создана !");
    })
    .catch((err) => {
      res.status(400).send({
        message: "Введите необходимые данные. Все поля должны быть корректны !",
      });
      console.log(err);
    });
};

const deleteCard = (req, res) => {
  cardSchema
    .findByIdAndDelete(req.params.cardId)
    .then((result) => {
      res.status(200).send("Карточка удалена !");
    })
    .catch((err) => {
      res.status(404).send({ message: "Карточка не найдена !" });
      console.log(err);
    });
};

const likeCard = (req, res) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .then((result) => res.status(200).send("Лайк поставлен !"))
    .catch((err) => {
      res.status(404).send({ message: "Карточка не найдена !" });
      console.log(err);
    });
};

const dislikeCard = (req, res) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .then((result) => res.status(200).send("Лайк удалён !"))
    .catch((err) => {
      res.status(404).send({ message: "Карточка не найдена !" });
      console.log(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
