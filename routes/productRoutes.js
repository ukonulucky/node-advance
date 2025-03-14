const express = require("express");
const { createProduct, getAllProducts, getProductStats } = require("../controllers/productController");


const productRouter = express.Router();


productRouter.post("/add", createProduct)

productRouter.get("/products", getAllProducts)
productRouter.get("/stats", getProductStats)



module.exports = productRouter