const express = require('express');
const { registerHotel, loginHotel } = require('../controllers/authControllers.js');

const router = express.Router();

router.post('/register', registerHotel);
router.post('/login', loginHotel);

module.exports = router;
