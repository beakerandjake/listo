import { logger } from '../logger.js';

/**
 * Express middleware which logs errors to the console.
 */
export const logErrors = () => (err, req, res, next) => {
  logger.error(err);
  next(err);
};
