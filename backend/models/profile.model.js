import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    }, 
    lastName: {
        type: String,
        required: true
    }, 
    phone: {
        type: Number,
        required: true
    }, 
    email: {
        type: String,
        required: true
    }, 
    street: {
        type: String,
        required: true
    }, 
    city: {
        type: String,
        required: true
    }, 
    state: {
        type: String,
        required: true
    }, 
    country: {
        type: String,
        required: true
    }, 
    pincode: {
        type: Number,
        required: true
    }, 
}, {timestamps: true})

export const Profile = mongoose.model("Profile", profileSchema)