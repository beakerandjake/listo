import { getDb } from '../db/sqlite.js';
import { logger } from '../logger.js';
import { getItemFieldsForSelectStatement } from './sqliteItemsRepository.js';

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
        IFNULL(SUM(CASE WHEN i.completedDate IS NULL THEN 1 ELSE 0 END), 0) AS active,
        IFNULL(SUM(CASE WHEN i.completedDate IS NOT NULL THEN 1 ELSE 0 END), 0) AS completed,
        IFNULL(SUM(
          CASE WHEN i.completedDate IS NULL 
          AND i.dueDate IS NOT NULL 
          AND date(i.dueDate) < date('now') 
            THEN 1 ELSE 0 end
        ), 0) AS overdue
      FROM items i
      WHERE i.deletedDate IS NULL;
    `)
    .get();

  logger.verbose('query for item count stats got: %s', result);

  return result;
};

/**
 * Returns all of the active, non-deleted items which have a due date between the specified range.
 * @param {string} startDate - ISO8601 formatted date string of the earliest due date (inclusive).
 * @param {string} endDate - ISO8601 formatted date string of the latest due date (exclusive).
 * @returns {object[]}
 */
const getItemsByDueDateRange = (startDate, endDate) => {
  logger.verbose('querying for all items due between: %s and %s', startDate, endDate);

  const result = getDb()
    .prepare(`
      SELECT ${getItemFieldsForSelectStatement()}
      FROM items
      WHERE 
        deletedDate IS NULL AND dueDate BETWEEN ? AND ?
    `)
    .all(startDate, endDate);

  logger.verbose('queried %d item(s) due between: %s and %s', result.length, startDate, endDate);

  return result;
};

export default {
  getItemCounts,
  getItemsByDueDateRange,
};
