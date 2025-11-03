import express from 'express'
import { allOrders, placeOrder, updateStatus, userOrders } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import protect from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin routes
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment routes
orderRouter.post('/place', protect, placeOrder)
// orderRouter.post('/stripe', protect, placeOrderStripe)
// orderRouter.post('/razorpay', protect, placeOrderRazorpay)

// User routes
orderRouter.post('/userorders', protect, userOrders)

// Verify payment routes
// orderRouter.post('/verifyStripe', protect, verifyStripe)
// orderRouter.post('/verifyRazorpay', protect, verifyRazorpay)

export default orderRouter;