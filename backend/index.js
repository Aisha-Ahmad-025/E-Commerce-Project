import express, { urlencoded } from "express";
import cors from 'cors'
import dotenv from "dotenv";
import connectDB from './config/db.js'
import authRoute from './routes/authRoute.js'
import productRoute from './routes/productRoute.js'
import orderRoute from './routes/orderRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import analyticsRoute from './routes/analyticsRoute.js'

dotenv.config()
connectDB()

const app = express()
app.use(
    cors({
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
        credentials: true,
    })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("server is running succesfully")
})

// routes
app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)
app.use('/api/payment', paymentRoute)
// analytics route is for the admin to manage all the things
app.use('/api/analytics', analyticsRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`sever is running on the port ${PORT}`)
})