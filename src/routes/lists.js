import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest.js';
import { getDb } from '../persistence/sqlite2.js';

const router = express.Router();

// Get all lists.
router.get('/', (req, res) => {
  const results = getDb()
    .prepare(`
      SELECT l.id, l.name, l.iconName, COUNT(i.listId) as itemCount
      FROM lists l
      LEFT JOIN items i on i.listId = l.id
      GROUP BY l.id, l.name, l.iconName;
    `)
    .all();

  res.send(results);
});

// Create list
router.post(
  '/',
  validateRequest([
    body('name').isLength({ min: 3, max: 50 }).trim().escape(),
    body('iconName').isLength({ min: 3, max: 50 }).trim().escape(),
  ]),
  (req, res) => {
    console.log('posted', req);

    res.sendStatus(200);
  },
);

export default router;
