const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    category: {
        type: String,
        required: [true, "Product category is required"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    inStock: {
        type: Boolean,
        default: false
        
    },
    tags: {
        type: [String]
    }


})


const ProductModel = mongoose.model("Product", productSchema)
module.exports = ProductModel