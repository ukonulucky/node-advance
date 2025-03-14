const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
   cb(null, path.join(__dirname, "uploads"))
    },
    filename: function (req, file,cb) { 
        cb(null, 
          file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      )
    }
})


/* add file filter function */


const checkFileFilter = (req, file, cb) => {
    if (file.mimetype.startWith("image")) {
        cb(null, true)
    } else { 
        cb(new Error("Not an image, please upload only images"))
    }
}

/* create multer middleware */
const uploadMiddleware = multer({
    storage: storage,
    fileFilter: checkFileFilter,
    limits: 5 * 1024 * 1024 // 5MB allowed size 
})

module.exports = uploadMiddleware