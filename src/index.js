'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuid } from 'uuid';

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;


let items = [
  { id: "123", name: "baboon" },
  { id: "456", name: "beaker" },
  { id: "789", name: "coyote" },
];

app.get('/api/v1/items', (req, res) => {
  res.send(items);
});

app.post('/api/v1/items', (req, res) => {
  const item = {
    id: uuid(),
    name: req.body.name,
  };

  if (items.find(x => x.name == item.name)) {
    res.sendStatus(409);
    return;
  }

  items.push(item);

  res.sendStatus(201);
});

app.delete('/api/v1/items/:itemId', (req, res) => {
  const index = items.findIndex(x => x.id == req.params.itemId);

  if (index > -1) {
    items.splice(index, 1);
    res.sendStatus(200);
    return;
  }

  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`listo running on http://localhost:${port}`);
});