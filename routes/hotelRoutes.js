const express = require('express');
const { createMenuItem, getHotelMenu } = require('../controllers/hotelControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/menu', authMiddleware, createMenuItem);
router.get('/menu', authMiddleware, getHotelMenu);

module.exports = router;
