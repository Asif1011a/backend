const express = require('express');
const router = express.Router();
const {
    getDashboardStats,
    getAllUsers,
    getAllAdmins,
    createAdmin,
    deleteUser,
    addCategory
} = require('../Controllers/AdminController');

// Dashboard stats
router.get('/stats', getDashboardStats);

// User management
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

// Admin management
router.get('/admins', getAllAdmins);
router.post('/admins', createAdmin);

// Category management
router.post('/categories', addCategory);

module.exports = router;