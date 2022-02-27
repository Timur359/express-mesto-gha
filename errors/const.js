const ERROR_CODE_400 = 400;
const ERROR_CODE_404 = 404;
const ERROR_CODE_500 = 500;

const hiddenError = (res) => {
  res
    .status(ERROR_CODE_500)
    .send({ message: "Произошла непредвиденная ошибка" });
};

module.exports = {
  ERROR_CODE_400,
  ERROR_CODE_404,
  ERROR_CODE_500,
  hiddenError,
};
