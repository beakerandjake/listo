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
const getAllItems = (listId) => {
  console.log('getAllItems', listId);
  return [];
};

export default {
  createItem,
  getAllItems,
  getItem,
};
