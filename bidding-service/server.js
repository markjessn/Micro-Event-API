const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const eventBus = require('./event-broker');

const app = express();
app.use(bodyParser.json());

let availableInventory = [];

eventBus.on('inventory.created', (item) => {
  console.log('📦 Inventory created event received:', item);
  availableInventory.push(item);
});

app.get('/available-inventory', (req, res) => {
  res.json(availableInventory);
});

// Submit a bid
app.post('/bids', async (req, res) => {
  const { inventory_id, bidder, amount } = req.body;

  if (!inventory_id || !bidder || !amount) {
    return res.status(400).json({ message: 'Missing bid data' });
  }

  try {
    const result = await db.query(
      'INSERT INTO bids (inventory_id, bidder, amount) VALUES ($1, $2, $3) RETURNING *',
      [inventory_id, bidder, amount]
    );

    const newBid = result.rows[0];

    // Emit bid.created event
    eventBus.emit('bid.created', newBid);

    res.status(201).json(newBid);
  } catch (err) {
    console.error('Error inserting bid:', err);
    res.status(500).json({ message: 'Database error' });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`🎯 Bidding Service running on port ${PORT}`);
});
