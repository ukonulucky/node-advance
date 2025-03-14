const ProductModel = require("../Db/dbModels/ProductSchema")
const ProductSchema = require("../Db/dbModels/ProductSchema")




const createProduct = async (req, res) => {
    try {

        const sampleProducts = [
            {
                name: "Headphone",
                category: "Electronics",
                price: 999,
                inStock: false,
                tags: ["audio", "tech"]


            },
            {
                name: "Television",
                category: "Electronics",
                price: 456,
                inStock: false,
                tags: ["audio", "math"]


            },
            {
                name: "Chair",
                category: "Furniture",
                price: 6000,
                inStock: true,
                tags: ["audio", "tech"]


            },
            {
                name: "Spoon",
                category: "Kitchen Utensils",
                price: 10,
                inStock: true,
                tags: ["cooking", "house"]


            }
    ]
        /* insert multiple elements  */

        const result = await ProductModel.insertMany(sampleProducts)

        res.status(201).json({
            status: false,
            message: "items created successfully",
            data: result
        })
        
        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
}
 

const getAllProducts = async (req, res) => { 
    try {
        const products = await ProductModel.aggregate([
        /* stage 1 */
            {
                $match: {
                    inStock: true,
                    price: {
                        $gte: 5
                    }
                }
            },
            /* stage 2 */
            {
                $group: {
                    _id: "$category",
                    avgPrice: {
                       $avg: "$price"
                    },
                    count: {
                        $sum: 1
                    } 
                }
            }
        ])
        res.status(200).json({
            message: "Product fetched",
            data: products,
            status: true
        })
    } catch (error) {
        res.status(500).json({
            message: error,
            status: false
        })
    }
}

const getProductStats = async (req, res) => { 
  try {
      const response = await ProductModel.aggregate([
          {
            $match: {
                category: "Electronics"
            }
          }, {
              $group: {
                  _id: null,
                  totalRevenue: {
                      $sum: "$price"
                  },
                  maxAmount: {
                      $max: "$price"
                  },
                  minAmount: {
                      $min: "$price"
                  },
                  averagePrice: {
                      $avg: "$price"
                  }
              }
          }
      ])
      res.status(200).json({
          message: "Product stats fetched",
          data: response,
          status: true
      })
  } catch (error) {
      res.status(500).json({
          message: error,
          status: false
      })
  }
}
module.exports = {
    createProduct, getAllProducts, getProductStats
}