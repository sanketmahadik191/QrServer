const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Hotel = require('../models/hotelSchema');
const dotenv = require('dotenv');

require('dotenv').config();

// Register a new hotel
exports.registerHotel = async (req, res) => {
  const { hotelName, ownerName, location, contactNo, email, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const hotel = new Hotel({
      hotelName,
      ownerName,
      location,
      contactNo,
      email,
      password: hashedPassword
    });
    
    await hotel.save();
    res.status(201).json({ message: 'Hotel registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering hotel', error });
  }
};

// Login
exports.loginHotel = async (req, res) => {
  const { email, password } = req.body;
  console.log(process.env.JWT_SECRET);
  
  try {
    const hotel = await Hotel.findOne({ email });
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    const isMatch = await bcrypt.compare(password, hotel.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ hotelId: hotel._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
