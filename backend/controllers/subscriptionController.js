import { Subscription } from "../models/subscription.model.js";

const addSubscription = async (req, res) => {
    try {
        const { userId, email } = req.body;

        const subscribeData = {
            userId,
            email
        }

        await Subscription.findOneAndUpdate({ userId }, subscribeData, { new: true, upsert: true });
        
        res.json({success: true, message: "Subscribed"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const checkSubscription = async (req, res) => {
    try {
        const { userId } = req.body;

        const subscribe = await Subscription.findOne({ userId })
        if (!subscribe) {
            return res.json({success: false, message: "Subscribe to avail discount"})
        }

        res.json({success: true, message: "Subscribed"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { addSubscription, checkSubscription }
