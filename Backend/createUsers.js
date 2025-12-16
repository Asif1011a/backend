const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./Modules/SignupModel');
require('dotenv').config();

async function createUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing users
        await User.deleteMany({});
        console.log('Cleared existing users');

        // Create regular user
        const userPassword = await bcrypt.hash('user123', 10);
        const user = new User({
            name: 'Test User',
            email: 'user@freshmart.com',
            password: userPassword,
            role: 'user'
        });
        await user.save();
        console.log('✅ Created regular user: user@freshmart.com / user123');

        // Create admin user
        const adminPassword = await bcrypt.hash('admin123', 10);
        const admin = new User({
            name: 'Admin User',
            email: 'admin@freshmart.com',
            password: adminPassword,
            role: 'admin'
        });
        await admin.save();
        console.log('✅ Created admin user: admin@freshmart.com / admin123');

        console.log('\n🎉 Users created successfully!');
        console.log('You can now login with:');
        console.log('Regular User: user@freshmart.com / user123');
        console.log('Admin User: admin@freshmart.com / admin123');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.disconnect();
    }
}

createUsers();