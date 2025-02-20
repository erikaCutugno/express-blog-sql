const routeNotFound = (req, res, next) => {
  res.status(404);
  res.json({
    error: "Not Found",
    message: "Rotta non trovata",
  });
};

module.exports = routeNotFound;
