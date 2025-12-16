const User = require('../Modules/SignupModel');
const Product = require('../Modules/ProductModel');
const Order = require('../Modules/OrderModel');

// Get dashboard stats
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalAdmins = await User.countDocuments({ role: 'admin' });
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();
        
        const totalRevenue = await Order.aggregate([
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);

        const monthlyOrders = await Order.aggregate([
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    count: { $sum: 1 },
                    revenue: { $sum: '$totalAmount' }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const categoryStats = await Product.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);

        res.json({
            totalUsers,
            totalAdmins,
            totalProducts,
            totalOrders,
            totalRevenue: totalRevenue[0]?.total || 0,
            monthlyOrders,
            categoryStats
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' }).select('-password').sort({ createdAt: -1 });
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new admin
const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new User({
            name,
            email,
            password: hashedPassword,
            role: 'admin'
        });

        await admin.save();
        res.status(201).json({ message: 'Admin created successfully', admin: { name, email, role: 'admin' } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add product category
const addCategory = async (req, res) => {
    try {
        const { name, icon, color } = req.body;
        // For now, we'll just return success as categories are handled in frontend
        res.json({ message: 'Category added successfully', category: { name, icon, color } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDashboardStats,
    getAllUsers,
    getAllAdmins,
    createAdmin,
    deleteUser,
    addCategory
};
