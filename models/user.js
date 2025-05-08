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
    toLowerCase : true 
  },
  userMobile : {
    type : String ,
    required : true ,
    unique : true 
  },
  userAddress : {
    type : String 
  },
  userAdharCard : {
    type : String ,
    unique: true ,
    required : true 
  },
  userPassword : {
    type : String ,
    unique : true ,
    required : true 
  },
  userRole : {
    type : String ,
    unique : true ,
    enum : ["admin" , "user"],
  },
  isVoted : {
    type : Boolean ,
    unique : true 
  }
}) 


const user = mongoose.model("User" , userSchema)