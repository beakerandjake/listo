import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import persistence from './persistence/index.js';

// TODO
// Use jsdoc style or similar comments
//  error handling
//  SQL docker setup
//  error handling, catch body parse errors.

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// register controllers.
app.use('/api', routes);

persistence
  .initialize()
  .then(() => {
    app.listen(port, () => console.log(`listo running on port ${port}`));
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const shutdown = async () => {
  await persistence.close();
  console.log('bye!');
  process.exit();
};

// handle shutdown signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
