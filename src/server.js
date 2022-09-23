import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/index.js';
import db from './db/index.js';
import config from './config.js';
import {
  logErrors,
  notFound,
  applicationErrorHandler,
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
const openApiSpecification = swaggerJSDoc(config.swaggerJSDoc);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification, config.swaggerUi));

// request logging
app.use(morgan('common', {
  stream: {
    write: (message) => logger.http(message.trim()),
  },
  immediate: true,
}));

// register routing
app.use('/api', routes);
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

const server = app.listen(config.port, () => logger.info(`listo running on port ${config.port}`));

const gracefulShutdown = () => {
  server.close(() => {
    logger.info('listo api server closed');
    process.exit(0);
  });
};

// handle shutdown signals
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
