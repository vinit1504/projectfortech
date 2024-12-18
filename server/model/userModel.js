import db from "../config/db.js";

// SQL query to create the users table if it does not exist
const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer', 'admin') NOT NULL,
    verification_token VARCHAR(255), 
    is_verified BOOLEAN DEFAULT FALSE  
);

`;

// Execute the query to create the table
db.query(createUsersTable, (err, result) => {
  if (err) {
    console.error("Error creating users table:", err.message);
    throw err; // Throw error to stop execution if table creation fails
  }
  console.log("Users table ready!");
});

// Ensure the database connection is properly closed after operations
db.end((err) => {
  if (err) {
    console.error("Error closing the connection:", err.message);
    throw err;
  }
  console.log("Database connection closed.");
});
