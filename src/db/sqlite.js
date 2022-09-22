import Database from 'better-sqlite3';
import config from '../config.js';

/**
 * Returns a new Database connection object.
 * @returns {Database} The Database connection.
 */
export const getDb = () => {
  const options = config.verbose
    ? { verbose: console.log }
    : {};

  return new Database(config.sqlite.dbLocation, options);
};

/**
 * Ensures the database is properly initialized with required tables.
 */
export const initialize = () => {
  const db = getDb();

  db.exec(`
    CREATE TABLE IF NOT EXISTS lists (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      iconName TEXT NOT NULL,
      createdDate INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      deletedAt INTEGER     
    );

    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY,
        listId INTEGER NOT NULL,
        name TEXT NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0,
        dueDate INTEGER,
        quantity INTEGER NOT NULL DEFAULT 1,
        note TEXT,
        createdDate INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
        completedDate INTEGER,
        deletedAt INTEGER,
        FOREIGN KEY(listId) REFERENCES lists(id)
    );
  `);
};
