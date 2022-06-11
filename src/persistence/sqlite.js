import { promises as fs } from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';

const dbLocation = path.join(process.env.HOME, '.listo/items.db');
sqlite3.verbose();

let db;

async function createDbDirectory(dirName) {
  try {
    await fs.access(dirName);
  } catch (error) {
    await fs.mkdir(dirName, { recursive: true });
  }
}

export async function initialize() {
  await createDbDirectory(path.dirname(dbLocation));
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbLocation, (error) => {
      if (error) {
        reject(error);
        return;
      }

      db.run(
        `
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY, 
            name TEXT NOT NULL, 
            quantity INTEGER NOT NULL DEFAULT 1
        );
      `,
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  });
}

export async function close() {
  return Promise.reject();
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
