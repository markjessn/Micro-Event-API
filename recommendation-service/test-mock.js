const axios = require('axios');

// Base URLs for your services
const BASE_URL_BIDS = 'http://localhost:3002';  // Bidding service
const BASE_URL_RECOMMENDATIONS = 'http://localhost:3003'; // Recommendation service

// Function to create a bid
async function createBid(inventory_id, bidder, amount) {
  const bidData = {
    inventory_id,
    bidder,
    amount,
  };

  try {
    const response = await axios.post(`${BASE_URL_BIDS}/bids`, bidData);
    console.log('New Bid Created:', response.data);
    return response.data;  // Return the bid data for further checks
  } catch (error) {
    console.error('Error creating bid:', error.message);
  }
}

// Function to fetch the recommendation for a specific inventory item
async function fetchRecommendation(inventoryId) {
  try {
    const response = await axios.get(`${BASE_URL_RECOMMENDATIONS}/recommendation/${inventoryId}`);
    console.log('Recommendation fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendation:', error.message);
  }
}

// Run the test
async function runTest() {
  const inventoryId = 1;  // Example inventory ID
  const bidder = 'JohnDoe';
  const bidAmount = 100;

  console.log('Running test...');

  // Step 1: Create a bid for inventory item
  const bid = await createBid(inventoryId, bidder, bidAmount);

  if (bid) {
    // Step 2: Fetch the recommendation after bid is created
    const recommendation = await fetchRecommendation(inventoryId);

    if (recommendation) {
      console.log('Recommendation Details:', recommendation);
    } else {
      console.log('No recommendation found.');
    }
  }
}

// Execute the test
runTest();
