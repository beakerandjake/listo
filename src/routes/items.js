import express from 'express';
import persistence from '../persistence/index.js';

const router = express.Router();

// Get All Items
router.get('/', async (req, res) => {
  const items = await persistence.getItems();
  res.send(items);
});

// Add New Item
router.post('/', (req, res) => {
  const { name } = req.body;

  if (!persistence.addItem(name)) {
    res.sendStatus(409);
    return;
  }

  res.sendStatus(201);
});

// Delete Item
router.delete('/:itemId', async (req, res) => {
  const deleteCount = await persistence.removeItem(req.params.itemId);
  res.sendStatus(deleteCount > 0 ? 200 : 404);
});

export default router;
