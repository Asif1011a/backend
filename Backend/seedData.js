const mongoose = require('mongoose');
const Product = require('./Modules/ProductModel');
require('dotenv').config();

const sampleProducts = [
    {
        name: 'Premium Flour',
        price: 100,
        oldPrice: 200,
        category: 'flour',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
        discount: '50% OFF',
        rating: 4.5,
        inStock: true
    },
    {
        name: 'Basmati Rice',
        price: 126,
        oldPrice: 180,
        category: 'rice',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop',
        discount: '30% OFF',
        rating: 4.8,
        inStock: true
    },
    {
        name: 'Cooking Oil',
        price: 90,
        oldPrice: 150,
        category: 'oil',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop',
        discount: '40% OFF',
        rating: 4.3,
        inStock: true
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        await Product.deleteMany({});
        console.log('Cleared existing products');
        
        await Product.insertMany(sampleProducts);
        console.log('Sample products added successfully');
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();