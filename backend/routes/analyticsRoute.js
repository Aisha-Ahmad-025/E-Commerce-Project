import express from 'express'
import { getAdminStats } from '../controller/analyticsController.js'

const router = express.Router()
router.get('/', getAdminStats)

export default router