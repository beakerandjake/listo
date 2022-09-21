import express from 'express';
import persistence from '../persistence/index.js';

const router = express.Router();

// Get all lists.
router.get('/', (req, res) => {
  const db = persistence.getDb();

  const statement = db
    .prepare(`
      SELECT l.id, l.name, l.iconName, COUNT(i.listId) as itemCount
      FROM listxs l
      LEFT JOIN items i on i.listId = l.id
      GROUP BY l.id, l.name, l.iconName;
  `);

  const results = statement.all();

  res.send(results);
});

export default router;
