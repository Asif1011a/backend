const mongoose = require('mongoose');
const User = require('./Modules/SignupModel');
const Product = require('./Modules/ProductModel');
require('dotenv').config();

async function viewDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB\n');
        
        // View all users
        const users = await User.find().select('-password');
        console.log('=== USERS ===');
        console.log(`Total users: ${users.length}`);
        users.forEach(user => {
            console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
        });
        
        console.log('\n=== PRODUCTS ===');
        // View all products
        const products = await Product.find();
        console.log(`Total products: ${products.length}`);
        products.forEach(product => {
            console.log(`- ${product.name} - ₹${product.price} (${product.category})`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

viewDatabase();