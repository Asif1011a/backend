const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./Modules/SignupModel');
require('dotenv').config();

async function testUserLogin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Check if user exists
        const user = await User.findOne({ email: 'user@freshmart.com' });
        if (!user) {
            console.log('❌ User not found');
            return;
        }

        console.log('✅ User found:', {
            name: user.name,
            email: user.email,
            role: user.role
        });

        // Test password
        const isMatch = await bcrypt.compare('user123', user.password);
        console.log('Password match:', isMatch ? '✅ Yes' : '❌ No');

        // Test admin user too
        const admin = await User.findOne({ email: 'admin@freshmart.com' });
        if (admin) {
            console.log('✅ Admin found:', {
                name: admin.name,
                email: admin.email,
                role: admin.role
            });
            const adminMatch = await bcrypt.compare('admin123', admin.password);
            console.log('Admin password match:', adminMatch ? '✅ Yes' : '❌ No');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.disconnect();
    }
}

testUserLogin();