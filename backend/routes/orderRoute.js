import express from 'express'
import protect from '../middleware/authMiddleware.js'
import admin from '../middleware/adminMiddleware.js'
import { createOrder, getOrders, getMyOrders, updateOrderStatus } from '../controller/orderController.js'

const router = express.Router()

router.route('/').get(protect, admin, getOrders).post(protect, createOrder)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id/status').put(protect, updateOrderStatus)


export default router
// myorder is for the user to check the detail of their order and it is taken by the id of the user
// / routhe in the get way is for admin to check all the order and in the post way is for those user who is login and want to create an order
// 