const environment = process.env.NODE_ENV;
const version = process.env.VERSION || '0.1.0';
const port = process.env.PORT || 3000;

export default {
  environment,
  port,
  version,
  sqlite: {
    dbLocation: process.env.SQLITE_LOCATION || '/var/lib/listo/items.db',
  },
  swaggerJSDoc: {
    definition: {
      openapi: '3.0.3',
      info: {
        title: 'listo api',
        version,
      },
      servers: [{
        url: `http://${process.env.PRODUCTION_SERVER_URL || 'localhost'}:${port}/api`,
        description: 'API',
      }],
    },
    apis: ['./src/routes/**/*.js', './src/models/**/*.js'],
  },
  swaggerUi: {
    customSiteTitle: 'listo api',
    swaggerOptions: {
      displayRequestDuration: true,
    },
  },
  validation: {
    inputCharactersRegex: /^[\w\-_\s.,\(\)!@#$&*]+$/, //eslint-disable-line
  },
  logging: {
    level: process.env.LOG_LEVEL || (environment === 'production' ? 'warn' : 'verbose'),
  },
};
