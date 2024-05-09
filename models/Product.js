const mongoose = require("mongoose");
const productschema =  mongoose.Schema({
    //prod_id: {
        //type: mongoose.Schema.Types.ObjectId,
       // default: mongoose.Types.ObjectId
    //},
    prod_id:  String,
    Product_name: String,
    Product_Brand: String, 
    quantity: Number,
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});







const product_collect = mongoose.model('product_collect', productschema);

module.exports = product_collect;

