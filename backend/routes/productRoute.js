import express from 'express'
import protect from '../middleware/authMiddleware.js'
import admin from '../middleware/adminMiddleware.js'


const router = express.Router()

//all products
router.route('/').get(getProducts).post(protect, admin, createProduct)
// specifis product
router.route('/:id').get(getProductById).put(product, admin, updateProducts).delete(protect, admin, deleteProduct)

export default router;