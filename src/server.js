import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';

// TODO
// Use jsdoc style or similar comments
//  Edit quantity of items with patch
//  routing, make api/v1 dynamic or from config.
//  Real data access layer, with different backing storage (in memory / sql)
//  SQL docker setup

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(port, () => {
  console.log(`listo running on http://localhost:${port}`);
});
