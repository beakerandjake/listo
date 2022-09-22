import express from 'express';
import { createList, getAllLists } from '../useCases/lists/index.js';

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

export default router;
