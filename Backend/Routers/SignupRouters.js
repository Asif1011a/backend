const express = require('express');
const router = express.Router();
const { signup, login, getAllUsers } = require('../Controllers/SignupController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// User registration
router.post('/signup', signup);

// User login
router.post('/login', login);

// Get all users (admin only)
router.get('/users', verifyToken, isAdmin, getAllUsers);

module.exports = router;