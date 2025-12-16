const mongoose = require('mongoose');
const Product = require('./Modules/ProductModel');
require('dotenv').config();

const allProducts = [
    { name: 'Premium Flour', price: 100, oldPrice: 200, category: 'flour', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop', discount: '50% OFF', rating: 4.5, inStock: true },
    { name: 'Basmati Rice', price: 126, oldPrice: 180, category: 'rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop', discount: '30% OFF', rating: 4.8, inStock: true },
    { name: 'Cooking Oil', price: 90, oldPrice: 150, category: 'oil', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop', discount: '40% OFF', rating: 4.3, inStock: true },
    { name: 'Spice Combo', price: 90, oldPrice: 120, category: 'spices', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop', discount: '25% OFF', rating: 4.6, inStock: true },
    { name: 'Toor Dal', price: 140, oldPrice: 160, category: 'dal', image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=300&h=200&fit=crop', discount: '12% OFF', rating: 4.4, inStock: true },
    { name: 'Wheat Flour', price: 85, oldPrice: 100, category: 'flour', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop', discount: '15% OFF', rating: 4.2, inStock: true },
    { name: 'Sunflower Oil', price: 120, oldPrice: 140, category: 'oil', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop', discount: '14% OFF', rating: 4.7, inStock: true },
    { name: 'Garam Masala', price: 45, oldPrice: 60, category: 'spices', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop', discount: '25% OFF', rating: 4.9, inStock: true },
    { name: 'Brown Rice', price: 150, oldPrice: 180, category: 'rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop', discount: '17% OFF', rating: 4.1, inStock: true },
    { name: 'Coconut Oil', price: 180, oldPrice: 220, category: 'oil', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop', discount: '18% OFF', rating: 4.5, inStock: true },
    { name: 'Moong Dal', price: 120, oldPrice: 140, category: 'dal', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=200&fit=crop', discount: '14% OFF', rating: 4.3, inStock: true },
    { name: 'Turmeric Powder', price: 35, oldPrice: 50, category: 'spices', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop', discount: '30% OFF', rating: 4.8, inStock: true },
    { name: 'Chana Dal', price: 110, oldPrice: 130, category: 'dal', image: 'https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=300&h=200&fit=crop', discount: '15% OFF', rating: 4.2, inStock: true },
    { name: 'Mustard Oil', price: 160, oldPrice: 200, category: 'oil', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop', discount: '20% OFF', rating: 4.4, inStock: true },
    { name: 'Red Chili Powder', price: 40, oldPrice: 55, category: 'spices', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop', discount: '27% OFF', rating: 4.6, inStock: true },
    { name: 'Jasmine Rice', price: 200, oldPrice: 250, category: 'rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop', discount: '20% OFF', rating: 4.7, inStock: true },
    { name: 'Besan Flour', price: 80, oldPrice: 100, category: 'flour', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop', discount: '20% OFF', rating: 4.3, inStock: true },
    { name: 'Urad Dal', price: 130, oldPrice: 150, category: 'dal', image: 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=300&h=200&fit=crop', discount: '13% OFF', rating: 4.1, inStock: true },
    { name: 'Olive Oil', price: 350, oldPrice: 400, category: 'oil', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop', discount: '12% OFF', rating: 4.8, inStock: true },
    { name: 'Coriander Powder', price: 30, oldPrice: 40, category: 'spices', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop', discount: '25% OFF', rating: 4.5, inStock: true },
    { name: 'Sona Masoori Rice', price: 110, oldPrice: 140, category: 'rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop', discount: '21% OFF', rating: 4.4, inStock: true },
    { name: 'Maida Flour', price: 60, oldPrice: 75, category: 'flour', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop', discount: '20% OFF', rating: 4.0, inStock: true },
    { name: 'Masoor Dal', price: 125, oldPrice: 145, category: 'dal', image: 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=300&h=200&fit=crop', discount: '14% OFF', rating: 4.3, inStock: true },
    { name: 'Sesame Oil', price: 220, oldPrice: 260, category: 'oil', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop', discount: '15% OFF', rating: 4.6, inStock: true },
    { name: 'Cumin Powder', price: 50, oldPrice: 65, category: 'spices', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop', discount: '23% OFF', rating: 4.7, inStock: true },
    { name: 'Parboiled Rice', price: 95, oldPrice: 120, category: 'rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop', discount: '21% OFF', rating: 4.2, inStock: true },
    { name: 'Ragi Flour', price: 70, oldPrice: 90, category: 'flour', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop', discount: '22% OFF', rating: 4.4, inStock: true },
    { name: 'Arhar Dal', price: 135, oldPrice: 155, category: 'dal', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop', discount: '13% OFF', rating: 4.2, inStock: true },
    { name: 'Groundnut Oil', price: 140, oldPrice: 170, category: 'oil', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop', discount: '18% OFF', rating: 4.3, inStock: true },
    { name: 'Black Pepper Powder', price: 80, oldPrice: 100, category: 'spices', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop', discount: '20% OFF', rating: 4.8, inStock: true },
    { name: 'Broken Rice', price: 75, oldPrice: 95, category: 'rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop', discount: '21% OFF', rating: 4.0, inStock: true },
    { name: 'Jowar Flour', price: 65, oldPrice: 80, category: 'flour', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop', discount: '19% OFF', rating: 4.1, inStock: true }
];

async function seedAllProducts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        await Product.deleteMany({});
        console.log('Cleared existing products');
        
        await Product.insertMany(allProducts);
        console.log(`Added all ${allProducts.length} products successfully!`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedAllProducts();