import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/mongoDb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints

app.get('/', (req, res) => {
    res.send("Server is running")
})

app.use('/api/v1/user', userRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/order', orderRouter)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})