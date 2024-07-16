const express = require('express');
const db = require('./db');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());

// routes
app.get('/', async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM schools');
    res.status(200).send(data.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  };
});

app.post('/', async (req, res) => {
  const { name, location } = req.body;
  try {
    await db.query('INSERT INTO schools (name, address) VALUES ($1, $2)', [name, location]);
    res.status(200).send({message: 'Successfully added child'});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  };
});

app.get('/setup', async (req, res) => {
  try {
    await db.query('CREATE TABLE schools( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))');
    res.status(200).send({message: 'Successfully created table'});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  };
});

app.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});