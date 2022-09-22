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
    DROP TABLE IF EXISTS items;
    DROP TABLE IF EXISTS lists;

    CREATE TABLE IF NOT EXISTS lists (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      iconName TEXT NOT NULL,
      createdDate TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deletedDate TEXT     
    );

    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY,
        listId INTEGER NOT NULL,
        name TEXT NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0,
        dueDate TEXT,
        quantity INTEGER NOT NULL DEFAULT 1,
        note TEXT,
        createdDate TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        completedDate TEXT,
        deletedDate TEXT,
        FOREIGN KEY(listId) REFERENCES lists(id)
    );

    INSERT INTO lists (name, iconName)
    VALUES ('todo', 'testIcon');
    INSERT INTO lists (name, iconName)
    VALUES ('grocery', 'testIcon');
    INSERT INTO items (listId, name)
    VALUES (1, 'get groceries');
    INSERT INTO items (listId, name, note)
    VALUES (1, 'pick weeds', 'a cool note');
    INSERT INTO items (listId, name, quantity)
    VALUES (2, 'apples', 4);
  `);
};
