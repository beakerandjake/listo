import express from 'express';
import persistence from '../persistence/index.js';

const router = express.Router();

// Get All Items
router.get('/', async (req, res) => {
  const items = await persistence.getItems();
  res.send(items);
});

// Add New Item
router.post('/', async (req, res) => {
  await persistence.addItem(req.body.name);
  res.sendStatus(201);
});

// Delete Item
router.delete('/:itemId', async (req, res) => {
  const deleteCount = await persistence.removeItem(req.params.itemId);
  res.sendStatus(deleteCount > 0 ? 200 : 404);
});

// Edit item
router.put('/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  const count = quantity < 1
    ? await persistence.removeItem(itemId)
    : await persistence.editItemQuantity(itemId, quantity);

  res.sendStatus(count > 0 ? 200 : 404);
});

export default router;
