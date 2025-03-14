const express = require("express")
const { isUserAdminMiddleware, isUserLoggedInMiddleware}  = require("../middleware/authMiddleware")
const uploadImageController = require("../controllers/imageController")

const uploadImagesMiddleware = require("../middleware/uploadImageMiddleware")
const { welcomeUser } = require("../controllers/userController")
const imageRouter = express.Router()



/* get all images */
imageRouter.get("/getAllImages", isUserLoggedInMiddleware,welcomeUser)
 
/* upload image */
imageRouter.post("/uploadImages",
    isUserLoggedInMiddleware,
    isUserAdminMiddleware,
    uploadImagesMiddleware.single("image"),
    uploadImageController)

module.exports = imageRouter