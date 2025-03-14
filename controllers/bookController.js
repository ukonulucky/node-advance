

/* get all books */

const { toInteger } = require("lodash");
const BookModel = require("../Db/dbModels/bookSchema")

const getAllBooks = async (req, res) => { 

    try {
        const books = await BookModel.find();

        res.status(200).json({
            status: true,
            message: "Books fetched successfully",
            data: books
        })
    } catch (error) {
        console.log(error.stack)
        res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}


/* get single book */

const getSingleBookById = async (req, res) => { 
  
   try {
    const { id } = req.params

       const book = await BookModel.findById(id);
       if (!book) {
         return  res.status(404).json({
               message: "Book does not exist",
               status: false
           })
       }
       res.status(200).json({
           message: "book fetched successfully",
           data: book,
           status: true
       })
   } catch (error) {
       console.log(error)
       res.status(500).json({
           message: "Internal server error",
           status: false
       })
   }


}


/* add new book */

const addBook = async(req, res) => {
    try {
       
        const newBook = await BookModel.create({
            ...req.body
        });
        if (newBook) { 
            res.status(201).json({
                status: true,
                message: "Book created successfully", 
                data: newBook
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error",
            status: false
        })
    }
    
 }


/* update single book */
 

const updateSingleBookById = async (req, res) => { 
    try {
        const { id } = req.params
    
        const book = await BookModel.findByIdAndUpdate(id, req.body, {
            new:true
        });
           if (!book) {
             return  res.status(404).json({
                   message: "Book does not exist",
                   status: false
               })
           }
           res.status(200).json({
               message: "book updated successfully",
               data: book,
               status: true
           })
       } catch (error) {
           console.log(error)
           res.status(500).json({
               message: "Internal server error",
               status: false
           })
       }
}


/* delete single book */

const deleteSingleBookById = async (req, res) => {
    try {
        const { id } = req.params
    
           const book = await BookModel.findByIdAndDelete(id);
           if (!book) {
             return  res.status(404).json({
                   message: "Book does not exist",
                   status: false
               })
           }
           res.status(200).json({
               message: "book deleted successfully",
               data: book,
               status: true
           })
       } catch (error) {
           console.log(error)
           res.status(500).json({
               message: "Internal server error",
               status: false
           })
       }
}


module.exports = {
    getAllBooks,
    getSingleBookById,
    addBook,
    updateSingleBookById,
    deleteSingleBookById
}