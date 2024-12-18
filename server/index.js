import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoute.js';
import dotenv from 'dotenv';
import cors from 'cors';  // Import cors

dotenv.config();

const app = express();

// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());

// Routes
app.use('/api/auth/v1', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
