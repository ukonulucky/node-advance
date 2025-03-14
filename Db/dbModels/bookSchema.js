const mongoose = require("mongoose")




const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Book title is required"],
        trim: true,
        maxLength: [100, "Book title can not be more than 100 characters"]
    },
    author: {
        type: String,
        required: [true, "Author name is required"],
        trim: true,
    },
    year: {
        type: String,
        required: [true, "Publication year is required"],
        min: [1000, "Year must be at least 1000"],
        max: [new Date().getFullYear(), "Year can not be in the future"]
    }
}, {
    timestamps: true
})


const BookModel = mongoose.model("Book", bookSchema)

module.exports = BookModel