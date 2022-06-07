'use strict';

import express from 'express';

// Constants
const PORT = process.env.PORT || 3000;

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`listo running on http://localhost:${PORT}`);
});