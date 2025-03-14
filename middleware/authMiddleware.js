const jwt = require("jsonwebtoken")


const isUserLoggedInMiddleware = async (req, res, next) => { 
  /* obtain the token sent through the request */
    const bearerToken = req.headers["authorization"]
    console.log("this is the headers",req.headers["authorization"])
    const token = bearerToken && bearerToken.split(" ")[1]

    if (!token) { 
     return   res.status(401).json({
            message: "Access denied! Invalid or no token provided",
            status: false
        })
    }
    /* check if token is valid */

    const userData = jwt.verify(token, process.env.JWT_SECRET)


    if (!userData) { 
    res.status(401).json({
    message: "Access denied! Invalid or no token provided",
    status: false
})
    }

    req.user = userData
 
    next()
}

const isUserAdminMiddleware = async (req, res, next) => { 
    if (req.user.role !== "admin") { 
     return    res.status(403).json({
            message: "Access denied! Admin login required",
            status: false
        })

    }
    next()
}


module.exports = {
    isUserLoggedInMiddleware,
    isUserAdminMiddleware
    }
 