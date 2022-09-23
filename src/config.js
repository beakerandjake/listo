const version = process.env.VERSION || '0.1.0';
const port = process.env.PORT || 3000;

export default {
  environment: process.env.NODE_ENV,
  port,
  verbose: !!process.env.VERBOSE,
  version,
  sqlite: {
    dbLocation: process.env.SQLITE_LOCATION || '/var/lib/listo/items.db',
  },
  swagger: {
    definition: {
      openapi: '3.0.3',
      info: {
        title: 'listo api',
        version,
      },
      servers: [{
        url: `http://localhost:${port}/api`,
        description: 'Development Server',
      }],
    },
    apis: ['./src/routes/**/*.js'],
  },
};
