import express from 'express';
import { v4 as uuid } from 'uuid';
import * as persistence from '../persistence/memory.js';

const router = express.Router();

// Get All Items
router.get('/', (req, res) => {
  res.send(persistence.getAll());
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
