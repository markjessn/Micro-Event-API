# Event-Driven Microservices System

## 🚀 Overview

This is a simple event-driven microservices system built using **Node.js** and **PostgreSQL**. The system consists of three services that communicate asynchronously via an in-memory event bus.

### **Services:**
1. **Inventory Service** - Manages inventory and emits events when new inventory is created.
2. **Bidding Service** - Handles bid submissions and listens for new inventory events to allow bidding.
3. **Recommendation Service** - Provides optimal bid recommendations based on past data and listens for bid events.

The services are designed to be loosely coupled and scalable, following event-driven architecture principles.

---

## 🔧 Prerequisites

- **Node.js** (v14 or higher)
- **PostgreSQL**
- **pgAdmin** or **psql CLI**
- **Postman** (for testing API endpoints)

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/event-driven-microservices.git
cd event-driven-microservices
```
### 2. Install Dependencies
Each service has its own folder. Go into each and install:

Inventory Service

``` bash
cd inventory-service
npm install
```

Bidding Service
``` bash
cd ../bidding-service
npm install
```

Recommendation Service
``` bash
cd ../recommendation-service
npm install
```
### 3. Set up PostgreSQL Database
### **Using pgAdmin:**
1.Open pgAdmin and connect to your PostgreSQL server.

2.Create a new database called microservices_db.

3.Navigate to the Query Tool and run the following SQL queries to create the necessary tables for each service.

``` bash
-- For Inventory Service
CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- For Bidding Service
CREATE TABLE bids (
  id SERIAL PRIMARY KEY,
  inventory_id INTEGER NOT NULL,
  bidder TEXT NOT NULL,
  amount INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- For Recommendation Service
CREATE TABLE recommendations (
  id SERIAL PRIMARY KEY,
  inventory_id INTEGER NOT NULL,
  recommended_amount INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
4.After running the queries, the necessary tables will be created in your microservices_db database.

### Using Command Line:

Alternatively, you can set up the database using PostgreSQL's command line interface.

1. Connect to your PostgreSQL database:
```bash
  psql -U postgres
```
2. Create the microservices_db database:
   ``` bash
   CREATE DATABASE microservices_db;
   ```
3. Switch to the newly created database:
   ``` bash
    \c microservices_db
   ```
4. Run the following SQL queries to create the necessary tables:
     ```bash
     -- For Inventory Service
      CREATE TABLE inventory (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        quantity INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      -- For Bidding Service
      CREATE TABLE bids (
        id SERIAL PRIMARY KEY,
        inventory_id INTEGER NOT NULL,
        bidder TEXT NOT NULL,
        amount INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      -- For Recommendation Service
      CREATE TABLE recommendations (
        id SERIAL PRIMARY KEY,
        inventory_id INTEGER NOT NULL,
        recommended_amount INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
   ```


4.Configure Service Databases
  In each service's db.js (for example, in inventory-service/db.js, bidding-service/db.js, and recommendation-service/db.js), ensure the PostgreSQL connection details are set correctly:
  ``` bash
  const pool = new Pool({
    user: 'your_user',
    host: 'localhost',
    database: 'microservices_db',
    password: 'your_password',
    port: 5432,
  });
```
**5. Start Services**

**Now, start each service on different ports:**

- Inventory Service: PORT=3001 node server.js

- Bidding Service: PORT=3002 node server.js

- Recommendation Service: PORT=3003 node server.js




### 🧪 Testing the System

You can interact with the services using Postman or curl.
1. Create an Inventory Item (POST /inventory)
   ``` bash
     POST http://localhost:3001/inventory
    {
      "name": "Smartphone",
      "quantity": 10
    }
   ```
**The Inventory Service will emit the inventory.created event.**

2. Submit a Bid (POST /bids)
 ``` bash
  POST http://localhost:3002/bids
  {
    "inventory_id": 1,
    "bidder": "JohnDoe",
    "amount": 250
  }
```
3. Get Latest Bid Recommendation (GET /recommendation/:inventoryId)
 ``` bash
GET http://localhost:3003/recommendation/1
```





