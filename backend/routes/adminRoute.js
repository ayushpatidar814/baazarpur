import express from 'express'
import { getOrdersByStatus, getOverview, getSalesTrends, getSubscribersTrends, getTopProducts } from '../controllers/adminController.js'
import adminAuth from '../middleware/adminAuth.js'

const adminRouter = express.Router()

adminRouter.get('/overview', adminAuth, getOverview)
adminRouter.get('/salesTrends', adminAuth, getSalesTrends)
adminRouter.get('/ordersStatus', adminAuth, getOrdersByStatus)
adminRouter.get('/topProducts', adminAuth, getTopProducts)
adminRouter.get('/subscribers', adminAuth, getSubscribersTrends)

export default adminRouter;