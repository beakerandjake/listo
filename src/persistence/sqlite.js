import { join, dirname } from 'path';
import { promises as fs } from 'fs';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const dbLocation = join(process.env.HOME, '.listo/items.db');

let db;

/**
 * Creates the specified directory if it does not exist.
 * @param {string} dirName
 */
async function ensureDbDirectoryExists(dirName) {
  try {
    await fs.access(dirName);
  } catch (error) {
    await fs.mkdir(dirName, { recursive: true });
  }
}

/**
 * Initializes the db object. Must be called before attempting to perform db operations.
 */
export async function initialize() {
  await ensureDbDirectoryExists(dirname(dbLocation));

  db = await open({
    filename: dbLocation,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY, 
      name TEXT NOT NULL, 
      quantity INTEGER NOT NULL DEFAULT 1
    )`);
}

/**
 * Closes the connection to the Database.
 */
export async function close() {
  await db.close();
}

/**
 * Returns all of the items.
 * @returns {Promise<Array>} Items array.
 */
export async function getItems() {
  return db.all('SELECT id, name, quantity FROM items');
}

/**
 * Deletes all of the items.
 */
export async function clearItems() {
  return db.run('DELETE FROM items');
}

/**
 * Adds a new item to the database.
 * @param {string} name the name of the item.
 * @returns {Promise<int>} The id of the new row.
 */
export async function addItem(name) {
  const { lastID } = await db.run('INSERT INTO items (name) VALUES (?)', name);
  return lastID;
}

/**
 * Attempts to delete an item with the specified id.
 * @param {int} id
 * @returns {Promise<bool>} Was the deletion successful?.
 */
export async function removeItem(id) {
  const { changes } = await db.run('DELETE FROM items WHERE id = ?', id);
  return changes > 0;
}

/**
 * Attempts to modify the quantity of the item with the specified id.
 * @param {int} id
 * @param {int} quantity
 * @returns {Promise<bool>} Was the edit successful?
 */
export async function editItemQuantity(id, quantity) {
  const { changes } = await db.run('UPDATE ITEMS SET quantity = $quantity WHERE id = $id', {
    $id: id,
    $quantity: quantity,
  });
  return changes > 0;
}
