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

  logger.verbose('got item: %s', !!item);

  return item;
};

/**
 * Does an item with the given id exist?
 * @param {number} id - The id to check for.
 * @returns {boolean}
 */
const existsWithId = (id) => {
  logger.verbose('querying if item exists with id: %s', id);

  const exists = getDb()
    .prepare(`
      SELECT EXISTS(
        SELECT 1 
        FROM items 
        WHERE id = ? AND deletedDate IS NULL
      );
    `)
    .pluck()
    .get(id);

  logger.verbose('item exists: %s', exists);

  return exists;
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
 * Deletes an item.
 * @param {number} itemId - The id of the item to delete.
 * @returns {boolean}
 */
const deleteItem = (itemId) => {
  logger.verbose('marking item: %s as deleted', itemId);

  const { changes } = getDb()
    .prepare(`
      UPDATE items
      SET deletedDate = ?
      WHERE id = ? AND deletedDate IS NULL
    `)
    .run(new Date().toISOString(), itemId);

  logger.verbose('marked %d item(s) as deleted', changes);

  return changes === 1;
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

// Used to dynamically generate UPDATE statements for item.
const DYNAMIC_EDIT_ITEM_FIELDS = [
  { paramName: 'quantity' },
  { paramName: 'note' },
  { paramName: 'dueDate' },
  {
    paramName: 'completed',
    columnName: 'completedDate',
    valueFn: (changesValue) => (changesValue ? new Date().toISOString() : null),
  },
];

/**
 * Apply edits to an item
 * @param {number} id - The id of the item.
 * @param {object} edits - The changes to apply to the item..
 * @returns {bool}
 */
const editItem = (id, edits) => {
  logger.verbose('editing item: %s with changes: %s', id, edits);

  // generate the update statements based on edits object.
  const dynamicUpdates = DYNAMIC_EDIT_ITEM_FIELDS
    .filter(({ paramName }) => Object.hasOwn(edits, paramName))
    .reduce((acc, { paramName, columnName, valueFn }) => {
      acc.statements.push(`${columnName || paramName} = ?`);
      acc.params.push(valueFn ? valueFn(edits[paramName]) : edits[paramName]);
      return acc;
    }, { statements: [], params: [] });

  // ensure at least one update statement was generated.
  if (dynamicUpdates.statements.length === 0) {
    throw new Error('Could edit item, no supported changes provided');
  }

  logger.verbose('generated dynamic updates: %s with params: %s', dynamicUpdates.statements, dynamicUpdates.params);

  const { changes } = getDb()
    .prepare(`
      UPDATE items
      SET ${dynamicUpdates.statements.join(', ')}
      WHERE id = ? AND deletedDate IS NULL
    `)
    .run([...dynamicUpdates.params, id]);

  logger.verbose('edited %d item(s)', changes);

  return changes === 1;
};

export default {
  createItem,
  getAllItems,
  getItem,
  deleteItem,
  deleteCompleted,
  deleteActive,
  deleteAll,
  existsWithId,
  editItem,
};
