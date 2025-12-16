const mongoose = require('mongoose');
const User = require('./Modules/SignupModel');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@freshmart.com' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }
        
        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = new User({
            name: 'Admin',
            email: 'admin@freshmart.com',
            password: hashedPassword,
            role: 'admin'
        });
        
        await admin.save();
        console.log('Admin user created successfully!');
        console.log('Email: admin@freshmart.com');
        console.log('Password: admin123');
        
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
}

createAdmin();