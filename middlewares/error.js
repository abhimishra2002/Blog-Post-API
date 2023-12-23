//Middleware which handles the error thrown from all the other middle wares

exports.errorHandler = (err, req, res, next) => {
  res.status(err.code || 500).json({ error: err.message || err });
};
