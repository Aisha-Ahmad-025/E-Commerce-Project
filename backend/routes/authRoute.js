import express from 'express'
import { registerUser, loginUser, getUsers } from '../controller/authController.js'
import protect from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/users', protect, admin, getUsers)