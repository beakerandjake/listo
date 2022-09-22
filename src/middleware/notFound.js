/**
 * Express middleware which always returns a 404 status.
 */
export const notFound = () => (req, res) => res.sendStatus(404);
