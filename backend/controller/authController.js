import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sendEmail from "../utils/sendMail.js";


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}
const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: ' User Already Exits' })
        }

        // password encrypt using the bcrypt 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = User.create({ name, email, hashedPassword })

        // if user find then generate the otp and also send the email
        if (user) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString()
            const message = `Welcome to Vendora Mall, ${name}! ✨
                    Your registration is almost complete. Your verification OTP is:
                    🔐 ${otp}
                    Please keep this code confidential and do not share it with anyone.
                    Thank you for joining Vendora Mall — your destination for a better way to shop. 🛍️
                    — Team Vendora Mall`;
            await sendEmail(email, 'Welcome to the Vendora Mall', message)
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(400).json({ message: "invalid user data" })
        }

    } catch (error) {
        res.status(500).json({ message: 'server error while user registration' })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await user.find({ email })
        if (user && bcrypt.compare(password, user.password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(400).json({ message: 'invalid email or password' })
        }
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('.password')
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
}


export {
    registerUser,
    loginUser,
    getUsers
}