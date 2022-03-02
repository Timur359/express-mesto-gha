/* eslint-disable no-console */

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");
const auth = require("./middlewars/auth");
const { createUsers, loginUser } = require("./controllers/users");

const app = express();

const PORT = 3000;
const db = "mongodb://localhost:27017/mestodb";

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/signup", createUsers);
app.post("/signin", loginUser);

app.use("/", auth, usersRoutes);
app.use("/", auth, cardsRoutes);
app.use("*", (req, res) => {
  res.status(404).send({ message: "Страница не найдена" });
});

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});
