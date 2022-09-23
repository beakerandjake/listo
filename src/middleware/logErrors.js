import { logger } from '../logger.js';

/**
 * Express middleware which logs errors.
 */
export const logErrors = () => (err, req, res, next) => {
  logger.error(err);
  next(err);
};
