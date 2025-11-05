import express from 'express';
import dotenv from 'dotenv'
dotenv.config();

import cors from 'cors'
import connectDB from './config/mongoDb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import profileRouter from './routes/profileRoute.js';
import subscriptionRouter from './routes/subscriptionRoute.js';
import adminRouter from './routes/adminRoute.js';


// App Config
const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();

// middlewares
app.use(cors({
  origin: [
    "https://baazarpur.vercel.app",
    "https://baazarpur-admin.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// app.use(cors())
app.use(express.json())

// api endpoints

app.get('/', (req, res) => {
    res.send("Server is running")
})

app.use('/api/v1/user', userRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/profile', profileRouter)
app.use('/api/v1/subscription', subscriptionRouter)
app.use('/api/v1/admin', adminRouter)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})