import express from 'express';
import { createList, getAllLists, deleteList } from '../useCases/lists/index.js';

const router = express.Router();

// Get all lists.
router.get('/', (req, res) => {
  const results = getAllLists();
  res.send(results);
});

// Create list
router.post('/', (req, res) => {
  const result = createList(req.body);
  res.send(result);
});

// Delete list
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  deleteList(id);
  res.sendStatus(200);
});

export default router;
