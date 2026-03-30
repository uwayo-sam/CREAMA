const express = require('express');
const Order = require('../models/Order');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { items, total } = req.body;
    const orderId = await Order.create({ user_id: req.user.id, total, items });
    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (error) {
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