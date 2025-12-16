const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../Controllers/OrderController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Create new order
router.post('/', verifyToken, createOrder);

// Get user orders
router.get('/', verifyToken, getUserOrders);

// Get all orders (admin only)
router.get('/all', verifyToken, isAdmin, getAllOrders);

// Update order status (admin only)
router.put('/:orderId/status', verifyToken, isAdmin, updateOrderStatus);

module.exports = router;