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

/**
 * Attempts to delete a list.
 * @param {number} id - The id of the list to delete.
 * @returns {boolean}
 */
const deleteList = (id) => {
  const db = getDb();
  const deleteTransition = db.transaction(() => {
    // delete the items in the list
    db
      .prepare("UPDATE items SET deletedAt = (strftime('%s', 'now')) WHERE listId = ? AND deletedAt IS NULL")
      .run(id);

    // delete the list itself.
    const { changes } = db
      .prepare("UPDATE lists SET deletedAt = (strftime('%s', 'now')) WHERE id = ? AND deletedAt IS NULL")
      .run(id);

    return changes === 1;
  });
  return deleteTransition();
};

export default {
  getLists,
  existsWithName,
  createList,
  deleteList,
};