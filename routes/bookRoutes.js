const express = require("express")
const { getAllBooks, getSingleBookById, updateSingleBookById, deleteSingleBookById, addBook } = require("../controllers/bookController")


const bookRouter = express.Router()



/* all routes for books */

bookRouter.get("/get", getAllBooks)
bookRouter.get("/:id", getSingleBookById)
bookRouter.put("/update/:id",updateSingleBookById)
bookRouter.delete("/delete/:id", deleteSingleBookById) 
bookRouter.post("/addBook", addBook)

module.exports = bookRouter

