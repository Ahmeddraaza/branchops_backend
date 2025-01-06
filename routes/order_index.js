const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/Product');

router.post('/addOrder', async (req, res) => {
    try {
        const { customerName, products } = req.body;

        console.log("Validating products array...");
        if (!products || products.length === 0) {
            return res.status(400).json({ msg: 'Products array cannot be empty' });
        }

        // Debug: Log each product
        products.forEach(product => {
            console.log("Product:", product);
        });

        // Validate and map product IDs
        const validatedProducts = await Promise.all(
            products.map(async (product) => {
                const foundProduct = await Product.findOne({ prod_id: product.id });
                if (!foundProduct) {
                    throw new Error(`Product with ID ${product.id} not found`);
                }
                return {
                    prod_id: foundProduct.prod_id,
                    quantity: product.quantity,
                    _id: foundProduct._id,
                };
            })
        );

        console.log("Products array validated successfully.");

        // Create a new order with validated products
        const order = new Order({ customerName, products: validatedProducts });

        console.log("Order object before save:", JSON.stringify(order, null, 2));

        // Save the order
        await order.save();

        console.log('Order saved with total_amount:', order.total_amount);
        res.status(201).json({ msg: 'Order created successfully', order, total_amount: order.total_amount });
    } catch (error) {
        console.error("Error occurred in /addOrder:", error.message);
        res.status(500).json({ msg: error.message });
    }
});

module.exports = router;
