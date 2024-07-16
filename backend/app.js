const express = require('express');
const db = require('./db');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3001;

const app = express();

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hello Hello!');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});