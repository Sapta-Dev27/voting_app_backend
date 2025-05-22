const User = require('../models/user');
const bycryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const userRegister = async (req, res) => {
  try {
    try {
      const { userName, userAge, userEmail, userAdharCard, userPassword, userRole } = req.body;
      const checkUserName = await User.findOne({ userName });
      if (checkUserName) {
        return res.status(400).json({
          success: false,
          message: "User already Exists",
        })
      }
      const checkUserEmail = await User.findOne({ userEmail });
      if (checkUserEmail) {
        return res.status(400).json({
          success: false,
          message: 'Email already exits'
        })
        const checkUserAdhar = await User.findOne({ userAdharCard });
        if (checkUserAdhar) {
          return res.status(400).json({
            success: false,
            message: "User with the Given Adhar Card already exists"
          })
        }
      }
      else {

        const salt = await bycryptjs.genSalt(10);
        const hashedPassword = await bycryptjs.hash(userPassword, salt);


        const newUser = await User.create({
          userName, userAge, userEmail, userAdharCard, userPassword: hashedPassword, userRole,
        });
        if (newUser) {
          return res.status(200).json({
            success: true,
            message: "User is created successfully",
            user: newUser
          })
        }
      }
    }
    catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "User is not created "
      })
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
}

const userLogin = async (req, res) => {
  try {
    try {
      //take the login crediantials from the user //
      const { userName, userAdharCard, userPassword } = req.body;

      // check if the user with the given username and adhar card exists or not //
      const checkUser = await User.findOne({ userName });
      if (!checkUser) {
        return res.status(400).json({
          success: false,
          message: "User with the given username does not exist"
        })
      }

      // check if the user with the given adhar card exists or not //
      const checkUserAdhar = await User.findOne({ userAdharCard })
      if (!checkUserAdhar) {
        return res.status(400).json({
          success: false,
          message: "User with the given Adhar Card does not exist"
        })
      }

      // check if the user with the given password exists or not //
      const checkUserPassword = await bycryptjs.compare(userPassword, checkUser.userPassword)
      if (!checkUserPassword) {
        return res.status(400).json({
          success: false,
          message: "Password is not correct"
        })
      }

      // if the user with the given username and adhar card exists then create a token for the user //
      const accessToken = await jwt.sign({ id: checkUser._id, username: checkUser.userName, useradharcard: checkUser.userAdharCard }, process.env.JWT_SECRET, { expiresIn: "1d" })

      return res.status(200).json({
        success: true,
        message: "User is logged in successfully",
        accessToken: accessToken,
        user: checkUser
      })
    }
    catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "User is not Logged In"
      })
    }
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const userChangePassword = async (req, res) => {
  try {

    // take the user id from the token //
    const userID = req.userInfo.id;

    // take the old password and new password from the user //


    const { oldPassword, newPassword } = req.body;

    // check if the user with the given id exists or not //
    const checkUser = await User.findById(userID);
    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "User Not Found"
      })
    }

    // check if the user with the given old password exists or not //
    const usercheckPassword = await bycryptjs.compare(oldPassword, checkUser.userPassword)
    if (!usercheckPassword) {
      return res.status(400).json({
        success: false,
        message: 'Old Password is not correct'
      }
      )
    }

    //hash the new password and save it to the database //
    const salt = await bycryptjs.genSalt(10);
    const hashedPassword = await bycryptjs.hash(newPassword, salt);

    checkUser.userPassword = hashedPassword;
    await checkUser.save();

    if (checkUser) {
      return res.status(200).json({
        success: true,
        message: "Password is changed successfully",
        user: checkUser
      })
    }
    else {
      return res.status(400).json({
        success: false,
        message: "Password is not changed"
      })
    }
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const changeUserName = async (req, res) => {
  try {
    try {
      
      // take the user id from the token //
      const userID = req.userInfo.id;

      // take the new username from the user //
      const { newuserName } = req.body;

      // check if the user with the given id exists or not //
      const checkUser = await User.findById(userID);
      if (!checkUser) {
        return res.status(400).json({
          success: false,
          message: "User Not Found"
        })
      }

      // check if the user with the given username exists or not //
      const checkUserName = await User.findOne({ userName: newuserName })

      if (checkUserName) {
        return res.status(400).json({
          success: false,
          message: "User with the given username already exists"
        })
      }

       //save the new username to the database //
      checkUser.userName = newuserName;

      await checkUser.save() ;

      return res.status(200).json({
        success : true ,
        message : "Username is changed successfully",
      })
    }
    catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "Username is not changed"
      })
    }
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const userChangeEmail = async(req,res)=> {
    try {
      try {
        // take the user id from the token //
         const userId = req.userInfo.id ;

         // take the new email from the user //
         const {newUserEmail} = req.body ;
          
         // check if the user with the given id exists or not //
         const checkUser = await User.findById(userId);

         

         if(!checkUser) {
          return res.status(400).json({
            success : false ,
            message : "User Not Found"
          })
         }
         
         //check the new email is already exists or not //
         const checkUserEmail = await User.findOne({userEmail : newUserEmail})

         if ( checkUserEmail) {
          return res.status(400).json({
            success : false ,
            message : "User with the given email already exists"
          })
         }
          

         //save the new email to the database //
         checkUser.userEmail = newUserEmail;

         await checkUser.save();

         return res.status(200).json({
          success : true ,
          message : "Email is changed successfully",
         })
      }
      catch (error) {
        console.log(error);
        return res.status(400).json({
          success : false ,
          message : "Email is not changed"
        })
      }
    }
    catch(error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      })
    }
}



module.exports = { userRegister, userLogin, userChangePassword , userChangeEmail , changeUserName}

