import express from 'express';
import { body, validationResult } from 'express-validator';
import asyncErrorHandler from 'express-async-handler';
import persistence from '../persistence/index.js';

const router = express.Router();

/**
 * Returns a middleware which runs express-validator chains against the request.
 * If any chain fails then a 400 response will be sent, otherwise the next middleware is invoked.
 * See: https://express-validator.github.io/docs/running-imperatively.html
 * @param {ValidationChain} validations
 */
function validateRequest(validations) {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
      return;
    }

    res.status(400).json({ errors: errors.array() });
  };
}

// Get all items.
router.get('/', asyncErrorHandler(async (req, res) => {
  const items = await persistence.getItems();
  res.send(items);
}));

// Delete All Items
router.delete('/', asyncErrorHandler(async (req, res) => {
  await persistence.clearItems();
  res.sendStatus(200);
}));

// Add New Item
router.post(
  '/',
  validateRequest([
    body('name')
      .exists({ checkFalsy: true })
      .withMessage('name is required.')
      .trim()
      .isLength({ min: 2, max: 128 })
      .withMessage('name must be between 2 and 128 characters.'),
  ]),
  asyncErrorHandler(async (req, res) => {
    const { name } = req.body;
    const id = await persistence.addItem(name);
    res.status(200).send({ id, name, quantity: 1 });
  }),
);

// Delete Item
router.delete('/:itemId', asyncErrorHandler(async (req, res) => {
  const deleted = await persistence.removeItem(req.params.itemId);
  res.sendStatus(deleted ? 200 : 404);
}));

// Edit item
router.patch(
  '/:itemId',
  validateRequest([
    body('quantity')
      .exists({ checkNull: true })
      .withMessage('quantity is required.')
      .isInt()
      .withMessage('quantity must be numeric'),
  ]),
  asyncErrorHandler(async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const itemFound = quantity < 1
      ? await persistence.removeItem(itemId)
      : await persistence.editItemQuantity(itemId, quantity);

    res.sendStatus(itemFound ? 200 : 404);
  }),
);

export default router;
