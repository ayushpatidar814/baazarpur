import express from 'express'
import { getProfileData, profileData } from '../controllers/profileController.js';
import protect from '../middleware/auth.js';

const profileRouter = express.Router()

profileRouter.post('/addData', protect, profileData)
profileRouter.post('/getData', protect, getProfileData)

export default profileRouter;