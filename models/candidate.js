const mongoose = require("mongoose")
const { type } = require("os")

const candidateSchema = new mongoose.Schema( {
  candidateName : {
    type : String ,
    required : true 
  },
  candidateAge : {
    type : Number,
    required : true 
  },
  candidateParty : {
    type : String ,
    required : true
  },
  candidateUserId : {
    type : String ,
    unique : true ,
    required : true 
  },
  candidateVoteCount : {
    type : Number ,
    required : true 
  },
  candidateVotes : [
    {
      username : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true 
      },
      userVotedAt : {
        type : Date ,
        required : true ,
        default : Date.now()
      }
    }
  ]
})


const candidate = mongoose.model("Candidate" , candidateSchema)