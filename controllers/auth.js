const User = require('../models/user');
const bycryptjs = require('bcryptjs')

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


module.exports = { userRegister }