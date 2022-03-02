const notFoundError = (res, text) => {
  res.status(404).send({ message: text });
};

module.exports = {
  notFoundError,
};
