import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import connectDB from './config/db.js'
import authRoute from './routes/authRoute.js'
dotenv.config()

connectDB()
const app=express()
app.use(cors())

app.get('/',(req,res)=>{
    res.send("server is running succesfully")
})

app.use('api/auth',authRoute)


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`sever is running on the port ${PORT}`)
})