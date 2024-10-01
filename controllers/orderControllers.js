const Menu = require('../models/menuModel');
const Order = require('../models/orderModel');

// Fixed preparation time per order in minutes
const PREPARATION_TIME_PER_ORDER = 30;

// Place an order
exports.placeOrder = async (req, res) => {
  const { hotelId, items, customerName, customerContact } = req.body;

  try {
    let totalBill = 0;

    // Calculate total price by fetching each menu item
    for (const item of items) {
      const menuItem = await Menu.findById(item.menuId);
      if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });

      totalBill += menuItem.price * item.quantity;
    }

    // Count pending and in-progress orders for this hotel
    const pendingAndInProgressOrders = await Order.countDocuments({
      hotelId,
      status: { $in: ['pending', 'in-progress'] }
    });

    // Calculate estimated time
    const estimatedMinutes = PREPARATION_TIME_PER_ORDER * (pendingAndInProgressOrders + 1);
    const estimatedTime = `${estimatedMinutes} minutes`;

    // Create the order
    const order = new Order({
      hotelId,
      items,
      totalBill,
      estimatedTime,
      customerName,
      customerContact
    });

    await order.save();

    res.status(201).json({
      message: 'Order placed successfully',
      estimatedTime,
      totalBill,
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
};

// Mark order as in-progress
exports.markOrderInProgress = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.status !== 'pending') {
      return res.status(400).json({ message: `Cannot mark order as in-progress from status '${order.status}'` });
    }

    order.status = 'in-progress';
    await order.save();

    res.status(200).json({ message: 'Order marked as in-progress', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
};

// Mark order as completed
exports.markOrderCompleted = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.status !== 'in-progress') {
      return res.status(400).json({ message: `Cannot mark order as completed from status '${order.status}'` });
    }

    order.status = 'completed';
    await order.save();

    res.status(200).json({ message: 'Order marked as completed', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
};

// Get all orders for a hotel (with optional status filter)
exports.getOrders = async (req, res) => {
  const hotelId = req.hotelId;
  const { status } = req.query; // Optional query parameter to filter by status

  try {
    let query = { hotelId };
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query).populate('items.menuId').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};
