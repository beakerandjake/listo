import { ApplicationError } from '../errors/ApplicationError.js';

/**
 * Express middleware which handles custom ApplicationErrors.
 */
export const applicationErrorHandler = () => (err, req, res, next) => {
  if (err instanceof ApplicationError) {
    res.status(err.statusCode).send(err.message);
    return;
  }

  next(err);
};
