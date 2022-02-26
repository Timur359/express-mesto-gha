const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");

const app = express();

const PORT = 3000;
const db = "mongodb://localhost:27017/mestodb";

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  // eslint-disable-next-line no-console
  .then(() => console.log("Connected to DB"))
  // eslint-disable-next-line no-console
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening port ${PORT}`);
});

app.use((req, res, next) => {
  req.user = {
    _id: "6218c9107a3977e8b015698f", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", usersRoutes);
app.use("/", cardsRoutes);
app.use("*", (req, res, next) => {
  next("Страница не найдена");
});

app.get("/", (req, res) => {
  res.redirect("http://localhost:3000/users");
});
