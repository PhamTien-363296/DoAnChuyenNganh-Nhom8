import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"



import connectMongoDB from "./db/connectMongoDB.js"


dotenv.config()


const app = express()
const PORT = process.env.PORT || 5000


app.use(express.urlencoded({ extended: true})) //to parse form data

app.use(cookieParser())




app.get("/", (req, res) => {
    res.send("Welcome to the Home Page");
});



app.listen(5000, ()=>{
    console.log(`Server is running on port ${PORT}`)
    connectMongoDB()
})