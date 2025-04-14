const express = require('express');
const bodyParser = require('body-parser');
const eventBus = require('./event-broker');
const db = require('./db');

const app = express();
app.use(express.json());


app.post('/inventory', async (req, res) => {
  const { name, quantity } = req.body;

  if (!name || !quantity) {
    return res.status(400).json({ message: 'Name and quantity are required.' });
  }

  try {
    const result = await db.query(
      'INSERT INTO inventory (name, quantity) VALUES ($1, $2) RETURNING *',
      [name, quantity]
    );

    const newItem = result.rows[0];

    // Emit event
    eventBus.emit('inventory.created', newItem);

    res.status(201).json(newItem);
  } catch (err) {
    console.error('Error inserting inventory:', err);
    res.status(500).json({ message: 'Database error' });
  }
});

// Get all inventory
app.get('/inventory', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM inventory ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching inventory:', err);
    res.status(500).json({ message: 'Database error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Inventory Service with DB running on port ${PORT}`);
});
