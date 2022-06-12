import express from 'express';
import { body, validationResult } from 'express-validator';
import persistence from '../persistence/index.js';

const router = express.Router();

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

// Get All Items
router.get('/', async (req, res) => {
  const items = await persistence.getItems();
  res.send(items);
});

// Delete All Items
router.delete('/', async (req, res) => {
  await persistence.clearItems();
  res.sendStatus(200);
});

// Add New Item
router.post(
  '/',
  validateRequest([body('name').trim().isLength({ min: 2, max: 128 })]),
  async (req, res) => {
    await persistence.addItem(req.body.name);
    res.sendStatus(201);
  },
);

// Delete Item
router.delete('/:itemId', async (req, res) => {
  const deleteCount = await persistence.removeItem(req.params.itemId);
  res.sendStatus(deleteCount > 0 ? 200 : 404);
});

// Edit item
router.patch(
  '/:itemId',
  validateRequest([body('quantity').isNumeric()]),
  async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const count = quantity < 1
      ? await persistence.removeItem(itemId)
      : await persistence.editItemQuantity(itemId, quantity);

    console.log('result', count);

    res.sendStatus(count > 0 ? 200 : 404);
  },
);

export default router;
