let backingStore;

// add support for more data stores here.
switch (process.env.BACKING_STORE) {
  default:
    backingStore = await import('./sqlite.js');
    break;
}

export default { ...backingStore };
