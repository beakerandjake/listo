// TODO switch based on config.
let backingStore;

switch (process.env.BACKING_STORE) {
  case 'sqlite':
    backingStore = await import('./sqlite.js');
    break;
  default:
    backingStore = await import('./memory.js');
    break;
}

export default { ...backingStore };
