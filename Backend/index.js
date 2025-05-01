import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import cloudinary from 'cloudinary'
// import path from 'path'
import connectDb from "./database/db.js";

cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Api,
    api_secret: process.env.Cloud_Secret,
})

const app = express();
const port = process.env.PORT

//using middlewares
app.use(express.json());
app.use(cookieParser());

// app.get("*", (req,res) => {
//     res.sendFile
// })

app.listen(port, ()=> {
    console.log(`Server started on ${port}`);
    connectDb();
})