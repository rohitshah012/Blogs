function notFoundHandler(req, res) {
  return res.status(404).render("error", {
    statusCode: 404,
    message: "Page not found",
  });
}

function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  console.error(error);

  return res.status(statusCode).render("error", {
    statusCode,
    message:
      statusCode === 500
        ? "Something went wrong. Please try again later."
        : error.message,
  });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
