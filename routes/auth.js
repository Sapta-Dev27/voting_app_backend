const express = require("express");
const router = express.Router();

const {userRegister, userLogin , userChangePassword , userChangeEmail , changeUserName} = require("../controllers/auth");

const {homemiddleware} = require("../middlewares/auth")


router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/changePassword" , homemiddleware, userChangePassword)
router.post("/changeEmail", homemiddleware, userChangeEmail)
router.post("/changeUserName", homemiddleware, changeUserName)

module.exports = router;

