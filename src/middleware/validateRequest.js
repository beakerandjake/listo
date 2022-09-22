import { validationResult } from 'express-validator';

/**
 * Returns a middleware which runs express-validator chains against the request.
 * If any chain fails then a 400 response will be sent, otherwise the next middleware is invoked.
 * See: https://express-validator.github.io/docs/running-imperatively.html
 * @param {ValidationChain} validations
 */
export const validateRequest = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
    return;
  }

  res.status(400).json({ errors: errors.array() });
};
