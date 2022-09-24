import { getDb } from '../db/sqlite.js';
import { logger } from '../logger.js';

/**
 * Inserts a new item.
 * @param {object} item - The item to insert.
 * @returns {object}
 */
const createItem = (item) => {
  logger.verbose('inserting item: %s', item);

  const { lastInsertRowid } = getDb()
    .prepare(`
      INSERT INTO items (listId, name, dueDate, quantity, note)
      VALUES (@listId, @name, @dueDate, @quantity, @note)   
    `)
    .run(item);

  logger.verbose('inserted item, id: %d', lastInsertRowid);

  return lastInsertRowid;
};

/**
 * Load the item.
 * @param {number} id - The id of the item.
 * @returns {object}
 */
const getItem = (id) => {
  logger.verbose('querying item with id: %s', id);

  const item = getDb()
    .prepare(`
      SELECT id, listId, name, dueDate, quantity, note, createdDate, completedDate
      FROM items
      WHERE id = ? AND deletedDate IS NULL
    `)
    .get(id);

  logger.verbose('got item: %s', item);

  return item;
};

/**
 * Returns all of the items in the list.
 * @param {number} listId - The id of the list.
 * @returns {array}
 */
const getAllItems = (listId) => {
  logger.verbose('querying items for list: %s', listId);

  const items = getDb()
    .prepare(`
      SELECT id, listId, name, dueDate, quantity, note, createdDate, completedDate
      FROM items
      WHERE listId = ? AND deletedDate IS NULL
    `)
    .all(listId);

  logger.verbose('got %d item(s) for list: %s', items.length, listId);

  return items;
};

/**
 * Deletes all items in the list marked as completed.
 * @param {number} listId - The id of the list.
 * @returns {number} The number of items deleted.
 */
const deleteCompleted = (listId) => {
  logger.verbose('marking completed items for list: %s as deleted', listId);

  const { changes } = getDb()
    .prepare(`
      UPDATE items
      SET deletedDate = ?
      WHERE listId = ? AND completedDate IS NOT NULL AND deletedDate IS NULL
    `)
    .run(new Date().toISOString(), listId);

  logger.verbose('marked %d item(s) as deleted', changes);

  return changes;
};

/**
 * Deletes all items in the list not marked as completed.
 * @param {number} listId - The id of the list.
 * @returns {number} The number of items deleted.
 */
const deleteActive = (listId) => {
  logger.verbose('marking active items for list: %s as deleted', listId);

  const { changes } = getDb()
    .prepare(`
      UPDATE items
      SET deletedDate = ?
      WHERE listId = ? AND completedDate IS NULL AND deletedDate IS NULL
    `)
    .run(new Date().toISOString(), listId);

  logger.verbose('marked %d item(s) as deleted', changes);

  return changes;
};

/**
 * Deletes all items in the list.
 * @param {number} listId - The id of the list.
 * @returns {number} The number of items deleted.
 */
const deleteAll = (listId) => {
  logger.verbose('marking all items for list: %s as deleted', listId);

  const { changes } = getDb()
    .prepare(`
      UPDATE items
      SET deletedDate = ?
      WHERE listId = ? AND deletedDate IS NULL
    `)
    .run(new Date().toISOString(), listId);

  logger.verbose('marked %d active item(s) as deleted', changes);

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
