import { getDb } from '../db/sqlite.js';

/**
 * Finds an item of a list based on the name
 * @param {string} name - The name of the item.
 * @param {number} listId - The id of the list.
 * @returns {boolean}
 */
const findByName = (name, listId) => getDb()
  .prepare(`
    SELECT id, name, completed, dueDate, quantity, note, createdDate, completedDate
    FROM items
    WHERE name=? AND listId=? AND deletedDate IS NULL
  `)
  .get(name, listId);

/**
 * Inserts a new item.
 * @param {object} item - The item to insert.
 * @returns {object}
 */
const createItem = (item) => {
  const db = getDb();
  const insertTransaction = db.transaction(() => {
    // insert the new item
    const { lastInsertRowid } = db
      .prepare(`
        INSERT INTO items (listId, name, dueDate, quantity, note)
        VALUES (@listId, @name, @dueDate, @quantity, @note)
      `)
      .run(item);

    // return the newly inserted row.
    return db
      .prepare(`
        SELECT id, listId, name, dueDate, quantity, note, createdDate
        FROM items
        WHERE id = ?
      `)
      .get(lastInsertRowid);
  });

  return insertTransaction();
};

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
  findByName,
  createItem,
  getAllItems,
};
