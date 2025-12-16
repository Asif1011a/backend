const Product = require('../Modules/ProductModel');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Add new product (admin only)
exports.addProduct = async (req, res) => {
    try {
        const { name, price, oldPrice, category, image, rating, inStock } = req.body;
        
        const discount = Math.round(((oldPrice - price) / oldPrice) * 100) + '% OFF';
        
        const newProduct = new Product({
            name,
            price,
            oldPrice,
            category,
            image,
            discount,
            rating: rating || 4.0,
            inStock: inStock !== undefined ? inStock : true
        });
        
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
};

// Update product (admin only)
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, oldPrice, category, image, rating, inStock } = req.body;
        
        const discount = Math.round(((oldPrice - price) / oldPrice) * 100) + '% OFF';
        
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name,
                price,
                oldPrice,
                category,
                image,
                discount,
                rating,
                inStock
            },
            { new: true }
        );
        
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete product (admin only)
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};