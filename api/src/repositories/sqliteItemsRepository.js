import { getDb } from '../db/sqlite.js';
import { logger } from '../logger.js';

/**
 * The fields that are selected when returning an item from the db.
 */
const ITEM_SELECT_FIELDS = [
  'id', 'listId', 'name', 'dueDate', 'quantity', 'note', 'createdDate', 'completedDate',
];

/**
 * Returns a string which can be used in a select statement
 * Selects the default item fields.
 * @param {string} alias - Optional alias used to prefix item fields when using an alias in select.
 * @returns {string}
 */
export const getItemFieldsForSelectStatement = (alias = '') => {
  const prefix = !alias || alias.trim() === '' ? '' : `${alias}.`;
  return ITEM_SELECT_FIELDS.map((field) => `${prefix}${field}`).join(',');
};

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
      SELECT ${getItemFieldsForSelectStatement()}
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
 * Does an item with the given name exist?
 * @param {number} listId - The id of the list whose items will be searched.
 * @param {string} name - The name of the item to search for.
 * @returns {number} The id of the matching item (if exists)
 */
const findActiveItemByName = (listId, name) => {
  logger.verbose('querying list: %s for active item with name: %s', listId, name);

  const { id } = getDb()
    .prepare(`
        SELECT id
        FROM items 
        WHERE listId = ? 
              AND name = ? COLLATE NOCASE 
              AND completedDate IS NULL 
              AND deletedDate IS NULL;
    `)
    .get(listId, name) || {};

  logger.verbose('queried item with name: %s', !!id);

  return id;
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
      SELECT ${getItemFieldsForSelectStatement()}
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

/**
 * Bulk edits items of the list.
 * @param {number} listId - The id of the list.
 * @param {object} edits - Changes to apply to all items of the list.
 * @returns {number} - The number of items edited.
 */
export const editItems = (listId, edits) => {
  logger.verbose('bulk editing all items for list: %s with edits: %s', listId, edits);

  // Todo, need more elegant solution if supporting more fields than just 'completed'

  let statement = `
    UPDATE items
    SET completedDate = ?
    WHERE listId = ? AND deletedDate IS NULL`;

  // If setting all items to completed, don't overwrite completedDate of already completed items.
  if (edits.completed) {
    statement += ' AND completedDate IS NULL';
  }

  const { changes } = getDb()
    .prepare(statement)
    .run(edits.completed ? new Date().toISOString() : null, listId);

  logger.verbose('edited %d active item(s)', changes);

  return changes;
};

/**
 * Returns all of the active, non-deleted items which have a due date between the specified range.
 * @param {string} startDate - ISO8601 formatted date string of the earliest due date (inclusive).
 * @param {string} endDate - ISO8601 formatted date string of the latest due date (inclusive).
 * @param {boolean} onlyActive - If true returns only items which haven't been completed.
 * @returns {object[]}
 */
const getItemsByDueDateRange = (startDate, endDate) => {
  logger.verbose('querying for active items due between: %s and %s', startDate, endDate);

  const result = getDb()
    .prepare(`
      SELECT ${getItemFieldsForSelectStatement()}
      FROM items
      WHERE 
        deletedDate IS NULL 
        AND dateTime(dueDate) BETWEEN dateTime(?) AND dateTime(?)
        AND completedDate IS NULL
      ORDER BY dueDate ASC
    `)
    .all(startDate, endDate);

  logger.verbose('queried %d item(s) due between: %s and %s', result.length, startDate, endDate);

  return result;
};

/**
 * Returns all of the active, non-deleted items which:
 *  1. Do not have a completed date set
 *  2. Have a due date which comes before the specified date.
 * @param {string} dueDate - ISO8601 formatted date string.
 * @returns {object[]}
 */
const getOverdueItems = (dueDate) => {
  logger.verbose('querying for all items overdue after: %s', dueDate);

  const result = getDb()
    .prepare(`
      SELECT ${getItemFieldsForSelectStatement()}
      FROM items
      WHERE 
        deletedDate IS NULL AND 
        completedDate IS NULL AND
        dueDate IS NOT NULL AND dueDate < ?
      ORDER BY dueDate ASC
    `)
    .all(dueDate);

  logger.verbose('queried %d item(s) overdue after: %s', result.length, dueDate);

  return result;
};

/**
 * Increments the quantity of an item by the specified amount.
 * @param {number} id - The id of the item.
 * @param {number} amount - The amount to increment the quantity by.
 * @returns {number} The amount of items edited
 */
const incrementQuantity = (id, amount = 1) => {
  logger.verbose('incrementing quantity of item: %s by: %s', id, amount);

  if (amount <= 0) {
    throw new Error('Increment amount must be a positive number.');
  }

  const { changes } = getDb()
    .prepare(`
      UPDATE items
      SET quantity = quantity + ?
      WHERE id = ? AND deletedDate IS NULL
    `)
    .run(amount, id);

  logger.verbose('incremented quantity of %d item(s)', changes);

  return changes;
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
  editItems,
  findActiveItemByName,
  getItemsByDueDateRange,
  getOverdueItems,
  incrementQuantity,
};
