import express from 'express';
import persistence from '../persistence/index.js';

const router = express.Router();

// Get All Items
router.get('/', async (req, res) => {
  const items = await persistence.getItems();
  console.log('got items', items);
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
router.delete('/:itemId', (req, res) => {
  if (persistence.removeItem(req.params.itemId)) {
    res.sendStatus(200);
    return;
  }

  res.sendStatus(404);
});

export default router;
