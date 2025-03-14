require("dotenv").config()

const express = require("express");
const connectDBFunc = require("./Db/dbConnect");
const bookRouter = require("./routes/bookRoutes");
const authRouter = require("./routes/authRoute");
const homeRouter = require("./routes/homeRoutes");
const imageRouter = require("./routes/imageRoutes");
const productRouter = require("./routes/productRoutes");



const app = express();

const port = process.env.PORT || 3000;


/* middleware  */
app.use(express.json())
app.use("/api/books", bookRouter)
app.use("/api/auth", authRouter)
app.use("/api/home", homeRouter)
app.use("/api/image", imageRouter)
app.use("/api/product", productRouter)





app.get("/", (req, res) => { 
    res.status(200).json("server running")
})


/* for all api */
app.use("*", async(req, res) => { 
    res.status(404).json({
        message: "Page not found"
    })
})


app.use((error,req, res, next) => { 
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: error.message || "Internal server error",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    })
})






app.listen(port, async () => { 
   try {
       const response = await connectDBFunc()
     
       console.log("database connected and server is running on port", port);
   } catch (error) {
       console.log("Internal server error", error)
       process.exit(1)
   }
})