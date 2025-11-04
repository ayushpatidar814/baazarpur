import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("MongoDB database connected")
        })
        await mongoose.connect(`${process.env.MONGODB_URI}`)
    } catch (error) {
        console.log("MongoDB failed", error)
    }
}
 
export default connectDB;