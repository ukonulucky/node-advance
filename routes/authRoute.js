const express = require("express")
const { registerUser, loginUser, getUsers } = require("../controllers/userController")


const authRouter = express.Router()


authRouter.post("/register", registerUser)

authRouter.post("/login", loginUser)


authRouter.get("/users", getUsers)


module.exports = authRouter