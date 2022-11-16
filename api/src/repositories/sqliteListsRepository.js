import { getDb } from '../db/sqlite.js';
import { logger } from '../logger.js';

/**
 * Returns the list.
 * @param {number} id - The id of the list to load.
 * @returns {object}
 */
const getList = (listId) => {
  logger.verbose('querying for list: %s', listId);

  const result = getDb()
    .prepare(`
      SELECT l.id, l.name, l.iconName, COUNT(i.listId) as itemCount
      FROM lists l
      LEFT JOIN items i on i.listId = l.id AND i.deletedDate IS NULL
      WHERE l.id = ? AND l.deletedDate IS NULL
      GROUP BY l.id, l.name, l.iconName;
    `)
    .get(listId);

  logger.verbose('query for list success: %s', !!result);

  return result;
};

/**
 * Returns all of the lists which have not been marked as deleted.
 * @returns {Array}
 */
const getLists = () => {
  logger.verbose('querying all lists');

  const lists = getDb()
    .prepare(`
      SELECT l.id, l.name, l.iconName, COUNT(i.listId) as itemCount
      FROM lists l
      LEFT JOIN items i on i.listId = l.id AND i.deletedDate IS NULL AND i.completedDate IS NULL
      WHERE l.deletedDate IS NULL
      GROUP BY l.id, l.name, l.iconName;
    `)
    .all();

  logger.verbose('got %d list(s)', lists.length);

  return lists;
};

/**
 * Does a list with the given name exist? Case sensitive.
 * @param {string} name - The name value to check for.
 * @returns {boolean}
 */
const existsWithName = (name) => {
  logger.verbose('querying if list exists with name: %s', name);

  const exists = getDb()
    .prepare(`
      SELECT EXISTS(
        SELECT 1 
        FROM lists 
        WHERE LOWER(LOWER(name)) LIKE LOWER(TRIM(?)) AND deletedDate IS NULL
      );
    `)
    .pluck()
    .get(name);

  logger.verbose('got match: %s', exists);

  return exists;
};

/**
 * Does a list with the given id exist?
 * @param {number} id - The id to check for.
 * @returns {boolean}
 */
const existsWithId = (id) => {
  logger.verbose('querying if list exists with id: %s', id);

  const exists = getDb()
    .prepare(`
      SELECT EXISTS(
        SELECT 1 
        FROM lists 
        WHERE id = ? AND deletedDate IS NULL
      );
    `)
    .pluck()
    .get(id);

  logger.verbose('got match: %s', exists ? 'true' : 'false');

  return exists;
};

/**
 * Creates a new list.
 * @param {object} list - The list to insert
 * @returns {number} The id of the newly created list.
 */
const createList = (list) => {
  logger.verbose('inserting list: %s', list);

  const { lastInsertRowid } = getDb()
    .prepare('INSERT INTO lists (name, iconName) VALUES (@name , @iconName)')
    .run(list);

  logger.verbose('inserted list: %d', lastInsertRowid);

  return lastInsertRowid;
};

/**
 * Attempts to delete a list.
 * @param {number} id - The id of the list to delete.
 * @returns {boolean}
 */
const deleteList = (id) => {
  logger.verbose('marking list: %s as deleted', id);

  const db = getDb();

  const deleteTransition = db.transaction(() => {
    logger.verbose('starting list delete transaction');

    const now = new Date().toISOString();

    // delete the items in the list
    const { changes: itemDeleteCount } = db
      .prepare('UPDATE items SET deletedDate = ? WHERE listId = ? AND deletedDate IS NULL')
      .run(now, id);

    logger.verbose('marked %d item(s) as deleted', itemDeleteCount);

    // delete the list itself.
    const { changes: listDeleteCount } = db
      .prepare('UPDATE lists SET deletedDate = ? WHERE id = ? AND deletedDate IS NULL')
      .run(now, id);

    logger.verbose('marked %d list(s) as deleted', listDeleteCount);

    return listDeleteCount === 1;
  });

  return deleteTransition();
};

/**
 * Applies changes to a list.
 * @param {number} id - The id of the list to edit.
 * @param {object} changes - The changes to apply
 * @param {string} changes.name - The new name of the list.
 * @param {string} changes.iconName - The new iconName of the list.
 * @returns {boolean}
 */
const editList = (id, changes) => {
  logger.verbose('updating list: %s with changes: %s', id, changes);

  const columnUpdates = [];

  if (changes?.name) {
    columnUpdates.push('name=@name');
  }

  if (changes?.iconName) {
    columnUpdates.push('iconName=@iconName');
  }

  // require at least one column to be updated.
  if (columnUpdates.length === 0) {
    throw new Error('Could edit list, no changes provided');
  }

  const { changes: changeCount } = getDb()
    .prepare(`
      UPDATE lists
      SET ${columnUpdates.join(', ')}
      WHERE id=@id AND deletedDate IS NULL;
    `)
    .run({ name: changes.name, iconName: changes.iconName, id });

  logger.verbose('updated %d lists(s)', changeCount);

  return changeCount === 1;
};

export default {
  getList,
  getLists,
  existsWithName,
  existsWithId,
  createList,
  deleteList,
  editList,
};
