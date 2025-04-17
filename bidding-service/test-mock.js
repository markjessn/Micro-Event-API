const axios = require('axios');

// Base URL of your local API server
const BASE_URL = 'http://localhost:3002';

// Function to test the GET /available-inventory endpoint
async function testGetAvailableInventory() {
  try {
    const response = await axios.get(`${BASE_URL}/available-inventory`);
    console.log('Available Inventory:', response.data);
  } catch (error) {
    console.error('Error fetching available inventory:', error.message);
  }
}

// Function to test the POST /bids endpoint
async function testPostBid() {
  const bidData = {
    inventory_id: 1,
    bidder: 'JohnDoe',
    amount: 100,
  };

  try {
    const response = await axios.post(`${BASE_URL}/bids`, bidData);
    console.log('New Bid Created:', response.data);
  } catch (error) {
    console.error('Error creating bid:', error.message);
  }
}

// Function to test the POST /bids with missing data
async function testPostBidMissingData() {
  const bidData = {}; // Missing required fields

  try {
    const response = await axios.post(`${BASE_URL}/bids`, bidData);
    console.log('Response with Missing Data:', response.data);
  } catch (error) {
    console.error('Expected Error with Missing Data:', error.message);
  }
}

// Function to test the POST /bids with a database error
async function testPostBidDatabaseError() {
  const bidData = {
    inventory_id: 1,
    bidder: 'JohnDoe',
    amount: 100,
  };

  try {
    const response = await axios.post(`${BASE_URL}/bids`, bidData);
    console.log('New Bid Created:', response.data);
  } catch (error) {
    console.error('Expected Database Error:', error.message);
  }
}

// Run all the tests
async function runTests() {
  console.log('Running tests...\n');
  await testGetAvailableInventory();
  await testPostBid();
  await testPostBidMissingData();
  await testPostBidDatabaseError();
}

runTests();
