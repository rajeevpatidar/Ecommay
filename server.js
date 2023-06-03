// const express = require('express')
// const colors = require('colors')
import express from 'express';
import dotenv from 'dotenv'
import colors from 'colors';
import morgan from 'morgan';
import connnectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import jwt from 'jsonwebtoken'
import cors from 'cors'
// const path = require('path')
import path from 'path'
// import { dirname } from 'path';

const __dirname = path.resolve()
//configure env
dotenv.config();


//database config
connnectDB();
// rest Object
const app = express();

//middleware
// app.use(express.limit(100000000));
app.use(express.json());
app.use(morgan('dev'))

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use(express.static(path.join(__dirname, './client/build')))
// console.log(path.join())
// rest apis 
// app.get('/',(req,res)=>{
//     res.send({message:"welcome to ecom"})
// })
app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})



// PORt
const PORT = process.env.PORT || 8080


//run list
app.listen(PORT, () => {
    console.log(`server running on mmode on ${process.env.DEV_MODE} at ${PORT}`.bgCyan.white)
})