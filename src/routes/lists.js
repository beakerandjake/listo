import express from 'express';
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

export default router;
