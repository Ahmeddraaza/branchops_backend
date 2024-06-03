const Product = require("../models/Product");
var express = require("express");
var router = express.Router();

// Create a new product
router.post('/addproducts', async (req, res) => {
    try {
        const { prod_id, Product_name, product_brand, quantity, price } = req.body;
        const newProduct = new Product({
            prod_id,
            Product_name,
            product_brand,
            quantity,
            price
        });
        await newProduct.save();
        res.status(200).json({ msg: 'Product created successfully', data: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Delete a product
router.delete('/products/:prod_id', async (req, res) => {
    try {
        const { prod_id } = req.params;
        const deletedProduct = await Product.findOneAndDelete({ prod_id });
        if (!deletedProduct) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(200).json({ msg: 'Product deleted successfully', data: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Retrieve all products
router.get('/findproducts', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ msg: 'Products retrieved successfully', data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Retrieve a single product by ID
router.get('/findproduct/:prod_id', async (req, res) => {
    try {
        const { prod_id } = req.params;
        const product = await Product.findOne({ prod_id });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(200).json({ msg: 'Product retrieved successfully', data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
