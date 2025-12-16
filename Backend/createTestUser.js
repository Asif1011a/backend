const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./Modules/SignupModel');
require('dotenv').config();

async function createTestUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        // Create admin user
        const adminPassword = await bcrypt.hash('admin123', 10);
        const adminUser = new User({
            name: 'Admin User',
            email: 'admin@freshmart.com',
            password: adminPassword,
            role: 'admin'
        });
        
        // Create regular user
        const userPassword = await bcrypt.hash('user123', 10);
        const regularUser = new User({
            name: 'John Doe',
            email: 'user@example.com',
            password: userPassword,
            role: 'user'
        });
        
        // Check if users already exist
        const existingAdmin = await User.findOne({ email: 'admin@freshmart.com' });
        const existingUser = await User.findOne({ email: 'user@example.com' });
        
        if (!existingAdmin) {
            await adminUser.save();
            console.log('Admin user created: admin@freshmart.com / admin123');
        } else {
            console.log('Admin user already exists');
        }
        
        if (!existingUser) {
            await regularUser.save();
            console.log('Regular user created: user@example.com / user123');
        } else {
            console.log('Regular user already exists');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('Error creating users:', error);
        process.exit(1);
    }
}

createTestUsers();