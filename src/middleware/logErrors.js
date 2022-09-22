import config from '../config.js';

/**
 * Express middleware which logs errors to the console.
 */
export const logErrors = () => (err, req, res, next) => {
  if (config.environment !== 'production') {
    console.error(err);
  }
  next(err);
};
