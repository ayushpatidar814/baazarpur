import express from 'express'
import { loginUser, registerUser, adminLogin } from '../controllers/user.controller.js'
import protect from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', protect, loginUser)
userRouter.post('/admin', adminLogin)

export default userRouter;