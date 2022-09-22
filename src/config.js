export default {
  environment: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  verbose: !!process.env.VERBOSE,
  sqlite: {
    dbLocation: process.env.SQLITE_LOCATION || '/var/lib/listo/items.db',
  },
};
