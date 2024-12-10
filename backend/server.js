import express from "express"
import morgan from 'morgan'
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { app, server } from './socket/socket.js'
import connectMongoDB from "./db/connectMongoDB.js"
import authRoutes from "./routes/auth.route.js"
import theloaiRoutes from "./routes/theloai.route.js"
import truyenRoutes from "./routes/truyen.route.js"
import chuongRoutes from "./routes/chuong.route.js"
import danhgiaRoutes from "./routes/danhgia.route.js"
import nguoidungRoutes from "./routes/nguoidung.route.js"
import tinnhanRoutes from "./routes/tinnhan.route.js"
import baivietRoutes from "./routes/baiviet.route.js"
import vnpayRoutes from "./routes/vnpay.route.js";
import giaodichRoutes from "./routes/giaodich.route.js";

import {v2 as cloudinary} from "cloudinary"


dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


const PORT = process.env.PORT || 5000

app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser())
app.use(morgan("tiny"))

app.use("/api/auth",authRoutes )
app.use("/api/theloai", theloaiRoutes)
app.use("/api/truyen", truyenRoutes)
app.use("/api/chuong", chuongRoutes)
app.use("/api/danhgia", danhgiaRoutes)
app.use("/api/nguoidung", nguoidungRoutes)
app.use("/api/tinnhan", tinnhanRoutes)
app.use("/api/baiviet",baivietRoutes)
app.use("/api/vnpay", vnpayRoutes);
app.use("/api/giaodich", giaodichRoutes);


app.get("/", (req, res) => {
    res.send("Welcome to the Home Page");
});

server.listen(5000, ()=>{
    console.log(`Server is running on port ${PORT}`)
    connectMongoDB()
})