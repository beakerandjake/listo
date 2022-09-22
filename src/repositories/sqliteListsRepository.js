import { getDb } from '../db/sqlite.js';

/**
 * Returns all of the lists which have not been marked as deleted.
 * @returns {Array}
 */
const getLists = () => getDb()
  .prepare(`
      SELECT l.id, l.name, l.iconName, COUNT(i.listId) as itemCount
      FROM lists l
      LEFT JOIN items i on i.listId = l.id
      GROUP BY l.id, l.name, l.iconName;
    `)
  .all();

/**
 * Does a list with the given name exist? Case sensitive.
 * @returns {boolean}
 */
const existsWithName = (name) => getDb()
  .prepare('SELECT EXISTS(SELECT 1 FROM lists WHERE name = ?)')
  .pluck()
  .get(name);

export default {
  getLists,
  existsWithName,
};
