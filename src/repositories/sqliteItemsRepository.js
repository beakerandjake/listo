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

const createItem = ({
  listId, name, dueDate, quantity, note,
}) => {
  const db = getDb();
  const insertTransaction = db.transaction(() => {
    // insert the new item
    const { lastInsertRowid } = db
      .prepare(`
        INSERT INTO items (listId, name, dueDate, quantity, note)
        VALUES (@listId, @name, @dueDate, @quantity, @note)
      `)
      .run({
        listId, name, dueDate, quantity, note,
      });

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

export default {
  findByName,
  createItem,
};
