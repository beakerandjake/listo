import { getDb } from '../db/sqlite.js';
import { logger } from '../logger.js';

/**
 * Returns counts of current non-deleted items for all lists.
 * @returns {object}
 */
const getItemCounts = () => {
  // logger.verbose('querying for list: %s', listId);

  // const result = getDb()
  //   .prepare(`
  //     SELECT l.id, l.name, l.iconName, COUNT(i.listId) as itemCount
  //     FROM lists l
  //     LEFT JOIN items i on i.listId = l.id AND i.deletedDate IS NULL
  //     WHERE l.id = ? AND l.deletedDate IS NULL
  //     GROUP BY l.id, l.name, l.iconName;
  //   `)
  //   .get(listId);

  // logger.verbose('query for list success: %s', !!result);

  // return result;
  return {};
};

export default {
  getItemCounts,
};
