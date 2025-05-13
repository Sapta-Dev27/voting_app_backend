const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  userName : {
    type : String ,
    required : true ,
    unique : true 
  },
  userAge : {
    type : Number ,
    required : true 
  },
  userEmail : {
    type : String ,
    required : true ,
    unique : true ,
    lowerCase : true 
  },
  userAdharCard : {
    type : String ,
    unique: true ,
    required : true 
  },
  userPassword : {
    type : String ,
    required : true 
  },
  userRole : {
    type : String ,
    enum : ["admin" , "user"],
    default : "user"
  }
  
}) 


const User = mongoose.model("User" , userSchema)
module.exports = User