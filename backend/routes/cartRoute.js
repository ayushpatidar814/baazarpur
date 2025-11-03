import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js'
import protect from '../middleware/auth.js'

const cartRouter = express.Router()

cartRouter.post('/add', protect, addToCart)
cartRouter.post('/update', protect, updateCart)
cartRouter.post('/get', protect, getUserCart)

export default cartRouter;