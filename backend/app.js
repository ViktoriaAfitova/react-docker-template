const express = require('express');
const { Pool } = require('pg');

const db = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'userTest',
  password: process.env.DB_PASSWORD || 'passwordTest',
  database: process.env.DB_NAME || 'databaseTest'
});

const hostname = '0.0.0.0';
const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/setup', async (req, res) => {
  try {
    await db.query('CREATE TABLE IF NOT EXISTS schools (id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))');
    res.status(200).send({ message: 'Successfully ensured table exists' });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.post('/', async (req, res) => {
  const { name, location } = req.body;
  try {
    await db.query('INSERT INTO schools (name, address) VALUES ($1, $2)', [name, location]);
    res.status(200).send({message: 'Successfully added child'});
  } catch (error) {
    res.sendStatus(500);
  };
});

app.get('/', async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM schools');
    res.status(200).send(data.rows);
  } catch (error) {
    res.sendStatus(500);
  };
});

app.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});