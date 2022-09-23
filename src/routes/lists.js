import express from 'express';
import {
  createList, getAllLists, deleteList, addItemToList,
} from '../useCases/lists/index.js';

const router = express.Router();

/**
 * @openapi
 * /:
 *   get:
 *     description: Returns all of the Lists.
 *     responses:
 *       200:
 *         description: An array containing the lists.
 */
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

// Add New Item to List.
router.post('/:id/items', (req, res) => {
  const { id } = req.params;
  const result = addItemToList(id, req.body);
  res.send(result);
});

export default router;
