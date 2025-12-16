const express = require('express');
const router = express.Router();
const { getAllProducts, getProductsByCategory, addProduct, updateProduct, deleteProduct } = require('../Controllers/ProductController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Get all products
router.get('/', getAllProducts);

// Get products by category
router.get('/category/:category', getProductsByCategory);

// Add new product (admin only)
router.post('/', verifyToken, isAdmin, addProduct);

// Update product (admin only)
router.put('/:id', verifyToken, isAdmin, updateProduct);

// Delete product (admin only)
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

module.exports = router;