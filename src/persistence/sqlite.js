import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';

const dbLocation = path.join(process.env.HOME, '.listo/items.db');

// ensure db file exists.
const dirName = path.dirname(dbLocation);
if (!fs.existsSync(dirName)) {
  fs.mkdirSync(dirName, { recursive: true });
}

// scaffold the db.
sqlite3.verbose();
const db = new sqlite3.Database(dbLocation, (err) => {
  if (err) return;
  db.run('CREATE TABLE IF NOT EXISTS items (id varchar(36), name TEXT)');
});

export function getAll() {
  console.log('not implemented');
}

export function add() {
  console.log('not implemented');
}

export function remove(id) {
  console.log('not implemented', id);
}
