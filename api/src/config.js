const environment = process.env.NODE_ENV;
const version = process.env.VERSION || '0.1.0';

// This is the port that express will to request on.
// When running in a container this is the port of the container
// That gets exposed, however it is not necessarily the port that the
// hose uses for communication.
const port = process.env.PORT || 3001;

export default {
  environment,
  port,
  version,
  sqlite: {
    dbLocation: process.env.SQLITE_LOCATION || './items.db',
  },
  swaggerJSDoc: {
    definition: {
      openapi: '3.0.3',
      info: {
        title: 'listo api',
        version,
      },
      servers: [{
        // When running in a container swagger needs to use the host port not the "internal" port.
        url: `http://${process.env.PRODUCTION_SERVER_URL || 'localhost'}:${process.env.EXTERNAL_PORT || port}/api`,
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
    level: process.env.LOG_LEVEL || (environment === 'production' ? 'warn' : 'debug'),
  },
};
