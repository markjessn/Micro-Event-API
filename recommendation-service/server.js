const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const eventBus = require('../event-broker');

const app = express();
app.use(bodyParser.json());

// Listen for bids
eventBus.on('bid.created', async (bid) => {
  const { inventory_id, amount } = bid;

  try {
    // Get all bids for this inventory
    const pastBids = await db.query(
      'SELECT amount FROM bids WHERE inventory_id = $1',
      [inventory_id]
    );

    const amounts = pastBids.rows.map(row => row.amount);
    amounts.push(amount); // include current one

    // Calculate simple recommended bid = avg + 10%
    const avg = amounts.reduce((a, b) => a + b, 0) / amounts.length;
    const recommendedAmount = Math.round(avg * 1.1);

    // Store recommendation
    await db.query(
      'INSERT INTO recommendations (inventory_id, recommended_amount) VALUES ($1, $2)',
      [inventory_id, recommendedAmount]
    );

    console.log(`💡 New recommendation for inventory ${inventory_id}: $${recommendedAmount}`);
  } catch (err) {
    console.error('Error processing recommendation:', err);
  }
});

app.get('/recommendation/:inventoryId', async (req, res) => {
  const { inventoryId } = req.params;

  try {
    const result = await db.query(
      'SELECT * FROM recommendations WHERE inventory_id = $1 ORDER BY created_at DESC LIMIT 1',
      [inventoryId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No recommendation found.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching recommendation:', err);
    res.status(500).json({ message: 'Database error' });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`🧠 Recommendation Service running on port ${PORT}`);
});
