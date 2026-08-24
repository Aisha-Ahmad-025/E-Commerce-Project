import express from 'express'
import { registerUser, loginUser, getUsers } from '../controller/authController.jsf'
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/users', protect, admin, getUsers)