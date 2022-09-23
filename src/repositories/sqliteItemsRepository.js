import { getDb } from '../db/sqlite.js';

/**
 * Inserts a new item.
 * @param {object} item - The item to insert.
 * @returns {object}
 */
const createItem = (item) => {
  const { lastInsertRowid } = getDb()
    .prepare(`
      INSERT INTO items (listId, name, dueDate, quantity, note)
      VALUES (@listId, @name, @dueDate, @quantity, @note)   
    `)
    .run(item);

  return lastInsertRowid;
};

const getItem = (id) => getDb()
  .prepare(`
    SELECT id, listId, name, completed, dueDate, quantity, note, createdDate, completedDate
    FROM items
    WHERE id = ? AND deletedDate IS NULL
  `)
  .get(id);

/**
 * Returns all of the items in the list.
 * @param {number} listId - The id of the list.
 * @returns {array}
 */
const getAllItems = (listId) => getDb()
  .prepare(`
    SELECT id, listId, name, completed, dueDate, quantity, note, createdDate, completedDate
    FROM items
    WHERE listId = ? AND deletedDate IS NULL
  `)
  .all(listId);

/**
 * Deletes all items in the list marked as completed.
 * @param {number} listId - The id of the list.
 * @returns {number} The number of items deleted.
 */
const deleteCompleted = (listId) => {
  const { changes } = getDb()
    .prepare(`
      UPDATE items
      SET deletedDate = ?
      WHERE listId = ? AND completedDate IS NOT NULL AND deletedDate IS NULL
    `)
    .run(new Date().toISOString(), listId);

  return changes;
};

/**
 * Deletes all items in the list not marked as completed.
 * @param {number} listId - The id of the list.
 * @returns {number} The number of items deleted.
 */
const deleteActive = (listId) => {
  const { changes } = getDb()
    .prepare(`
      UPDATE items
      SET deletedDate = ?
      WHERE listId = ? AND completedDate IS NULL AND deletedDate IS NULL
    `)
    .run(new Date().toISOString(), listId);

  return changes;
};

/**
 * Deletes all items in the list.
 * @param {number} listId - The id of the list.
 * @returns {number} The number of items deleted.
 */
const deleteAll = (listId) => {
  const { changes } = getDb()
    .prepare(`
      UPDATE items
      SET deletedDate = ?
      WHERE listId = ? AND deletedDate IS NULL
    `)
    .run(new Date().toISOString(), listId);

  return changes;
};

export default {
  createItem,
  getAllItems,
  getItem,
  deleteCompleted,
  deleteActive,
  deleteAll,
};
