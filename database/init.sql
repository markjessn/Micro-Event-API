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