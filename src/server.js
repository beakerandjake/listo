import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes/index.js';
import persistence from './persistence/index.js';

// TODO
// check await vs return vs return await
// publish docker image.

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

// register error handling
app.use((req, res) => res.sendStatus(404));
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.expose && err.message ? err.message : null);
});

// ensure database is ready, then start server.
persistence
  .initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`listo running on port ${PORT}`));
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const shutdown = async () => {
  await persistence.close();
  process.exit();
};

// handle shutdown signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
