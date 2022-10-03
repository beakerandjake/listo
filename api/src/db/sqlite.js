import Database from 'better-sqlite3';
import config from 'config';
import { logger } from '../logger.js';

/**
 * Returns a new Database connection object.
 * @returns {Database} The Database connection.
 */
export const getDb = () => {
  logger.silly('creating db connection');
  return new Database(config.get('sqlite.dbLocation'), { verbose: logger.silly });
};

/**
 * Ensures the database is properly initialized with required tables.
 */
export const initialize = () => {
  const db = getDb();

  logger.debug('initializing database');

  db.exec(`
    CREATE TABLE IF NOT EXISTS lists (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      iconName TEXT NOT NULL,
      createdDate TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      deletedDate TEXT     
    );

    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY,
        listId INTEGER NOT NULL,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        note TEXT,
        createdDate TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
        dueDate TEXT,
        completedDate TEXT,
        deletedDate TEXT,
        FOREIGN KEY(listId) REFERENCES lists(id)
    );
  `);

  logger.debug('database initialized');
};
