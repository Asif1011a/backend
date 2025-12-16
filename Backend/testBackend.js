const mongoose = require('mongoose');
const Product = require('./Modules/ProductModel');
const User = require('./Modules/SignupModel');
require('dotenv').config();

async function testBackend() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');
        
        // Test products
        const productCount = await Product.countDocuments();
        console.log(`✅ Products in database: ${productCount}`);
        
        if (productCount > 0) {
            const sampleProduct = await Product.findOne();
            console.log('✅ Sample product:', {
                id: sampleProduct._id,
                name: sampleProduct.name,
                price: sampleProduct.price,
                category: sampleProduct.category
            });
        }
        
        // Test users
        const userCount = await User.countDocuments();
        console.log(`✅ Users in database: ${userCount}`);
        
        if (userCount > 0) {
            const sampleUser = await User.findOne().select('-password');
            console.log('✅ Sample user:', {
                id: sampleUser._id,
                name: sampleUser.name,
                email: sampleUser.email,
                role: sampleUser.role
            });
        }
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

testBackend();