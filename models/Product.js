const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
    prod_id: String,
    Product_name: String,
    Product_Brand: String,
    quantity: Number,
    price: Number,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('product_collects', productschema);

module.exports = Product;
