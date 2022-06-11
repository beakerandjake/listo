import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';

const dbLocation = path.join(process.env.HOME, '.listo/items.db');

// ensure db file exists.
const dirName = path.dirname(dbLocation);
console.log('need to create db at', dirName);
if (!fs.existsSync(dirName)) {
  fs.mkdirSync(dirName, { recursive: true });
}

// scaffold the db.
sqlite3.verbose();
const db = new sqlite3.Database(dbLocation, (err) => {
  if (err) return;
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY, 
        name TEXT NOT NULL, 
        quantity INTEGER NOT NULL DEFAULT 1
    );
  `);
});

export async function getAll() {
  return new Promise((resolve, reject) => {
    db.all('SELECT id, name, quantity FROM items;', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export async function add() {
  console.log('not implemented');
}

export async function remove(id) {
  console.log('not implemented', id);
}
