import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import config from 'config';
import url from 'url';
import path from 'path';
import routes from './routes/index.js';
import db from './db/index.js';
import {
  logErrors,
  notFound,
  applicationErrorHandler,
  serveFrontend,
} from './middleware/index.js';
import { logger } from './logger.js';

const app = express();

// register middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// register swagger
const openApiSpecification = swaggerJSDoc(config.get('swagger.jsDoc'));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification, config.get('swagger.ui')));

// request / response logging
app.use(morgan('common', {
  stream: {
    write: (message) => logger.http(message.trim()),
  },
  immediate: true,
}));

// register api routing
app.use('/api', routes);

// if running in production, then serve the static frontend website.
if (config.util.getEnv('NODE_ENV') === 'production') {
  const dirName = path.dirname(url.fileURLToPath(import.meta.url));
  const publicFolderPath = path.join(dirName, '..', 'public');
  app.use(serveFrontend(publicFolderPath));
}

// handle any unknown routes by returning 404.
app.use(notFound());

// error handling
app.use(logErrors());
app.use(applicationErrorHandler());
app.use((err, req, res, next) => res.sendStatus(500));

// ensure database is initialized before starting API.
try {
  db.initialize();
} catch (error) {
  logger.error(error);
  process.exit(1);
}

const server = app.listen(config.get('port'), () => logger.info(`listo running on port ${config.get('port')}`));

const gracefulShutdown = () => {
  server.close(() => {
    logger.info('listo api server closed');
    process.exit(0);
  });
};

// handle shutdown signals
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
