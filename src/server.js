import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes/index.js';
import persistence from './persistence/index.js';

const PORT = process.env.PORT || 3000;

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
if (process.env.NODE_ENV !== 'production') {
  app.use((err, req, res, next) => {
    console.error(err);
    next(err);
  });
}

// default error handler, just return 500.
app.use((err, req, res, next) => res.sendStatus(500));

// ensure database is initialized before starting API.
try {
  persistence.initialize();
} catch (error) {
  console.error(error);
  process.exit(1);
}

const server = app.listen(PORT, () => console.log(`listo running on port ${PORT}`));

const gracefulShutdown = () => {
  server.close(() => {
    console.log('listo api server closed');
    process.exit(0);
  });
};

// handle shutdown signals
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
