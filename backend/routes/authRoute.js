import express from 'express'
import { registerUser, loginUser, getUsers } from '../controller/authController.js'
import protect from '../middleware/authMiddleware.js'
import admin from '../middleware/adminMiddleware.js'
const router = express.Router()


// into the models we have a generate token function and here we are checking it via protect middleware
//also thw admin can see all the user by using the admin middleware
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/users', protect, admin, getUsers)