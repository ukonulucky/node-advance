const express = require("express")
const { welcomeUser } = require("../controllers/userController")
const { isUserAdminMiddleware, isUserLoggedInMiddleware}  = require("../middleware/authMiddleware")


const homeRouter = express.Router()



homeRouter.get("/welcome", isUserLoggedInMiddleware, isUserAdminMiddleware ,welcomeUser)

module.exports = homeRouter