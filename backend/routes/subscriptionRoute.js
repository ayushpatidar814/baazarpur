import express from 'express'
import { addSubscription, checkSubscription } from '../controllers/subscriptionController.js'
import protect from '../middleware/auth.js';

const subscriptionRouter = express.Router()

subscriptionRouter.post('/subscribe', protect, addSubscription)
subscriptionRouter.post('/check', protect, checkSubscription)

export default subscriptionRouter;