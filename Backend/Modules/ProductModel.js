const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    discount: { type: String, required: true },
    rating: { type: Number, default: 4.0 },
    inStock: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);