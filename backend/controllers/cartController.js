// add product to user cart
import { User } from "../models/user.model.js"

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body

        const userData = await User.findById(userId)
        let cartData = await userData.cartData

        if(cartData[itemId]) {
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await User.findByIdAndUpdate(userId, {cartData})
        
        res.json({success: true, message: "Product added to cart successfully"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body

        const userData = await User.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity

        await User.findByIdAndUpdate(userId, {cartData})

        res.json({success: true, message: "Cart Updated"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body
        
        const userData = await User.findById(userId)
        let cartData = await userData.cartData;

        res.json({success:true, cartData, message: "Cart details fetched successfully"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


export { addToCart, updateCart, getUserCart }
