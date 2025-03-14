
const mongoose = require("mongoose")


const { MONGO_DB_URL } = process.env

const connectDBFunc = async () => {
    try { 
        /*
         Connect to the MongoDB database.
         */
        return await mongoose.connect(MONGO_DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
       
    } catch (error) {
        console.log("mongoDb connection error", error)
        mongoose.connection.close()
       return error
        
    }
}
module.exports = connectDBFunc