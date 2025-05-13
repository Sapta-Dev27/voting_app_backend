require("dotenv").config()
const express = require("express")

const coonectToDB = require("./db/db")
const authRoutes = require("./routes/auth")

const app = express();
const port = process.env.PORT ;

app.use(express.json());
coonectToDB();


app.use("/user",authRoutes);



app.listen( port, () => {
 console.log( `Server is running successfully on port ${port}`)
})