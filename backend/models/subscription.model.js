import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Subscription = mongoose.model("Subscription", subscriptionSchema)