const ApiError = require('./ApiError');

exports.apiErrorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }

  res.status(500).json('something went wrong');
};

exports.asyncErr = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(new ApiError(400, err));
    }
  };
};
