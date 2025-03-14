const imageModel = require("../Db/dbModels/imageSchema")
const { uploadToCloudinary } = require("../helpers/cloudinaryHelpers")




const uploadImageController = async(req, res) => { 
    try {
        if (!req.file) { 
            res.status(400).json({
                message: "Missing file",
                status: false
            })
            return 
        }
        const result = await uploadToCloudinary(req.file.path)
        if (result) { 
            /* store in mongoDB */
            
            const storeImage = await imageModel.create({
                publicId: result.publicId,
                url: result.url,
                uploadedBy: req.user._id
            })


         return    res.status(201).json({
                message: "Image uploaded successfully",
             status: true,
                data: storeImage
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}

module.exports = uploadImageController