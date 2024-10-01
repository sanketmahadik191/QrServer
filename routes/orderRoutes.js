const express = require('express');
const {
  placeOrder,
  markOrderInProgress,
  markOrderCompleted,
  getOrders
} = require('../controllers/orderController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Place an order
router.post('/place', placeOrder);

// Mark an order as in-progress
router.put('/in-progress/:orderId', markOrderInProgress);

// Mark an order as completed
router.put('/complete/:orderId', markOrderCompleted);

// Get all orders (with optional status filter)
router.get('/', authMiddleware, getOrders);

module.exports = router;
