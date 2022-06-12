import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import persistence from './persistence/index.js';

// TODO
//  error handling
//  SQL docker setup
//  error handling, catch body parse errors.
// check await vs return vs return await

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
