const myCloudinary =  require("../config/cloudinary")

const uploadToCloudinary = async (filePath) => { 
    try {
        const result = await myCloudinary.uploader.upload(filePath);
        return {
            url: result.secure_url,
            publicId: result.public_id
        }
    } catch (error) {
        console.log("failed dto upload to cloudinary")
        throw new Error("Failed to upload to cloudinary")
    }
}



module.exports = {
    uploadToCloudinary
}