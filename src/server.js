import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes/index.js';
import db from './db/index.js';
import config from './config.js';

const app = express();

// register middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// register routing
app.use('/api', routes);
app.use((req, res) => res.sendStatus(404));

// log errors in development
if (config.environment !== 'production') {
  app.use((err, req, res, next) => {
    console.error(err);
    next(err);
  });
}

// default error handler, just return 500.
app.use((err, req, res, next) => res.sendStatus(500));

// ensure database is initialized before starting API.
try {
  db.initialize();
} catch (error) {
  console.error(error);
  process.exit(1);
}

const server = app.listen(config.port, () => console.log(`listo running on port ${config.port}`));

const gracefulShutdown = () => {
  server.close(() => {
    console.log('listo api server closed');
    process.exit(0);
  });
};

// handle shutdown signals
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
