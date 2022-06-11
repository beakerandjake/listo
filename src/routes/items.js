import express from 'express';
import { v4 as uuid } from 'uuid';
import persistence from '../persistence/index.js';

const router = express.Router();

// Get All Items
router.get('/', async (req, res) => {
  const items = await persistence.getAll();
  res.send(items);
});

// Add New Item
router.post('/', (req, res) => {
  const item = {
    id: uuid(),
    name: req.body.name,
  };

  if (!persistence.add(item)) {
    res.sendStatus(409);
    return;
  }

  res.sendStatus(201);
});

// Delete Item
router.delete('/:itemId', (req, res) => {
  if (persistence.remove(req.params.itemId)) {
    res.sendStatus(200);
    return;
  }

  res.sendStatus(404);
});

export default router;
