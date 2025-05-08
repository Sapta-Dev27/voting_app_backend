require("dotenv").config();
const mongoose = require("mongoose")

const connectToDb = async() => {
   try{
      try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database is connected successfully")
      }
      catch{
        console.log("Database is not connected successfully")
      }
   }
   catch(error){
       console.log(error)
   }
}

module.exports = connectToDb