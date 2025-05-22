
const jwt = require("jsonwebtoken")


const homemiddleware = (req, res, next) => {

  const authHeaders = req.headers["authorization"];
  console.log(authHeaders);
  const token = authHeaders && authHeaders.split(" ")[1];
  console.log(token);

  if (!token) {
    res.status(401).json({
      success: false,
      message: "User is not authenticated. Try again to Login "
    })
  }

  try {
    const decodedToken = jwt.verify(token, "123456789");
    console.log(decodedToken);
    req.userInfo = decodedToken;
    next();
  }
  catch {
    res.status(500).json({
      success: false,
      message: " Internal Server Error"
    })
  }

}

module.exports = {homemiddleware};
