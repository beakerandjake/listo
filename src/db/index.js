import config from '../config.js';

let backingStore;

// add support for more data stores here.
switch (config.database.backingStore) {
  case 'sqlite':
    backingStore = await import('./sqlite.js');
    break;
  default:
    throw new Error(`Unsupported Database Backing Store: ${config.database.backingStore}`);
}

export default { ...backingStore };
