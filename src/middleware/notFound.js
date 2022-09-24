import { logger } from '../logger.js';

/**
 * Express middleware which always returns a 404 status.
 */
export const notFound = () => (req, res) => {
  logger.http('404 unknown route %s', req.url);
  res.sendStatus(404);
};
