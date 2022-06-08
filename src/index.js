'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import * as items from './items.js';

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get('/api/v1/items', items.list);
app.post('/api/v1/items', items.add);
app.delete('/api/v1/items/:itemId', items.remove);

app.listen(port, () => {
  console.log(`listo running on http://localhost:${port}`);
});