const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const orderRoutes = require('./routes/orderRoutes');
const dotenv = require('dotenv');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hotel', hotelRoutes);
app.use('/api/order',orderRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
