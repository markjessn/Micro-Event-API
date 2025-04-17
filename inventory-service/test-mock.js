const axios = require('axios');

// Base URL of your local API server
const BASE_URL = 'http://localhost:3001'; // Assuming your app runs on port 3001

// Function to test the GET /inventory endpoint
async function testGetInventory() {
  try {
    const response = await axios.get(`${BASE_URL}/inventory`);
    console.log('Available Inventory:', response.data);
  } catch (error) {
    console.error('Error fetching inventory:', error.message);
  }
}

// Function to test the POST /inventory endpoint
async function testPostInventory() {
  const inventoryData = {
    name: 'Item1',
    quantity: 100,
  };

  try {
    const response = await axios.post(`${BASE_URL}/inventory`, inventoryData);
    console.log('New Inventory Item Created:', response.data);
  } catch (error) {
    console.error('Error creating inventory item:', error.message);
  }
}

// Function to test the POST /inventory with missing data
async function testPostInventoryMissingData() {
  const inventoryData = {}; // Missing required fields

  try {
    const response = await axios.post(`${BASE_URL}/inventory`, inventoryData);
    console.log('Response with Missing Data:', response.data);
  } catch (error) {
    console.error('Expected Error with Missing Data:', error.message);
  }
}

// Function to test the POST /inventory with a database error
async function testPostInventoryDatabaseError() {
  const inventoryData = {
    name: 'Item2',
    quantity: 100,
  };

  try {
    const response = await axios.post(`${BASE_URL}/inventory`, inventoryData);
    console.log('New Inventory Item Created:', response.data);
  } catch (error) {
    console.error('Expected Database Error:', error.message);
  }
}

// Run all the tests
async function runTests() {
  console.log('Running tests...\n');
  await testGetInventory();
  await testPostInventory();
  await testPostInventoryMissingData();
  await testPostInventoryDatabaseError();
}

runTests();
