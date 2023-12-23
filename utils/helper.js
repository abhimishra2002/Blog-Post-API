//Function to send error.
exports.sendError = (res, error, statusCode = 401) =>
  res.status(statusCode).json({ error });

//Function to throw error for the 404 not found
exports.notFoundHandler = (req, res) => {
  return this.sendError(res, "Not found", 404);
};
