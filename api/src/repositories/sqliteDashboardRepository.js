import { getDb } from '../db/sqlite.js';
import { logger } from '../logger.js';

/**
 * Returns counts of current non-deleted items for all lists.
 * @returns {object}
 */
const getItemCounts = () => {
  logger.verbose('querying for item count stats');

  const result = getDb()
    .prepare(`
      SELECT 
        COUNT(*) as total,
        IFNULL(SUM(CASE WHEN i.completedDate IS NOT NULL THEN 1 ELSE 0 END), 0) AS completed,
        IFNULL(SUM(
          CASE WHEN i.completedDate IS NULL 
          AND (i.dueDate IS NULL OR i.dueDate > date('now'))
          THEN 1 ELSE 0 END
        ), 0) AS active,
        IFNULL(SUM(
          CASE WHEN i.completedDate IS NULL 
          AND i.dueDate IS NOT NULL 
          AND i.dueDate < date('now') 
          THEN 1 ELSE 0 end
        ), 0) AS overdue
      FROM items i
      WHERE i.deletedDate IS NULL;
    `)
    .get();

  logger.verbose('query for item count stats got: %s', result);

  return result;
};

export default {
  getItemCounts,
};
