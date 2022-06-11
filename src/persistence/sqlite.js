import { join, dirname } from 'path';
import { promises as fs } from 'fs';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const dbLocation = join(process.env.HOME, '.listo/items.db');

let db;

async function ensureDbDirectoryExists(dirName) {
  try {
    await fs.access(dirName);
  } catch (error) {
    await fs.mkdir(dirName, { recursive: true });
  }
}

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
    );
  `);
}

export async function close() {
  
  await db.close();
}

export async function getItems() {
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

export async function addItem() {
  console.log('not implemented');
}

export async function removeItem(id) {
  console.log('not implemented', id);
}
