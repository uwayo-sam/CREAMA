const express = require('express');
const Order = require('../models/Order');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('Received order request:', req.body);
    console.log('User ID:', req.user.id);
    const { items, total, delivery_address, latitude, longitude } = req.body;
    const orderId = await Order.create({
      user_id: req.user.id,
      total,
      items,
      delivery_address,
      latitude,
      longitude
    });
    console.log('Order created with ID:', orderId);
    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.findByUserId(req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

module.exports = router;