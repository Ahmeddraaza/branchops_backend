const mongoose = require('mongoose');
const Product = require('./Product'); // Import the Product model

const ProductSchema = new mongoose.Schema({
    Product_name: String,
    prod_id: String,
    quantity: Number
});

const OrderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    products: [ProductSchema],
    total_amount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

// Pre-save middleware to calculate total amount and manage stock
OrderSchema.pre('save', async function (next) {
    try {
        let totalAmount = 0;

        await Promise.all(this.products.map(async product => {
            const foundProduct = await Product.findOne({ prod_id: product.prod_id });
            if (!foundProduct) throw new Error(`Product with ID ${product.prod_id} not found`);
            if (foundProduct.quantity < product.quantity) throw new Error(`Insufficient stock for product ${foundProduct.Product_name}`);
            totalAmount += foundProduct.price * product.quantity;

            // Reduce product quantity
            foundProduct.quantity -= product.quantity;
            await foundProduct.save();
        }));

        // Assign the total amount to the order
        this.total_amount = totalAmount;
        next();
    } catch (error) {
        next(error);
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
