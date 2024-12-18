import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// console.log(process.env.DATABASE_HOST);
// console.log(process.env.DATABASE_USER);

// Create connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

// Connect to database
db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected Successfully!');
});

export default db;
