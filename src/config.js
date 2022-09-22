export default {
  port: process.env.PORT || 3000,
  verbose: !!process.env.VERBOSE,
  database: {
    backingStore: process.env.BACKING_STORE || 'sqlite',
    sqlite: {
      dbLocation: process.env.SQLITE_LOCATION || '/var/lib/listo/items.db',
    },
  },
};
