import { getDb } from '../db/sqlite.js';

/**
 * Returns all of the lists which have not been marked as deleted.
 * @returns {Array}
 */
const getLists = () => getDb()
  .prepare(`
      SELECT l.id, l.name, l.iconName, COUNT(i.listId) as itemCount
      FROM lists l
      LEFT JOIN items i on i.listId = l.id AND i.deletedAt IS NULL
      WHERE l.deletedAt IS NULL
      GROUP BY l.id, l.name, l.iconName;
    `)
  .all();

/**
 * Does a list with the given name exist? Case sensitive.
 * @param {string} name - The name value to check for.
 * @returns {boolean}
 */
const existsWithName = (name) => getDb()
  .prepare(`
    SELECT EXISTS(
      SELECT 1 
      FROM lists 
      WHERE name = ? AND deletedAt IS NULL
    );
  `)
  .pluck()
  .get(name);

/**
 * Does a list with the given name exist? Case sensitive.
 * @param {object} list
 * @param {string} list.name - The name of the list.
 * @param {string} list.iconName - The name of the icon.
 * @returns {number} The id of the newly created list.
 */
const createList = ({ name, iconName }) => {
  const { lastInsertRowid } = getDb()
    .prepare('INSERT INTO lists (name, iconName) VALUES (?,?)')
    .run(name, iconName);

  return lastInsertRowid;
};

export default {
  getLists,
  existsWithName,
  createList,
};
