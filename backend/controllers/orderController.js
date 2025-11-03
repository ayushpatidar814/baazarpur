import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
// import Stripe from 'stripe'
// import razorpay from 'razorpay'

// Global variables
const currency = 'inr'
const deliveryCharge = 40

// Gateway initialize
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// const razorpay = new razorpay({
//     key_id : process.env.RAZORPAY_KEY_ID,
//     key_secret : process.env.RAZORPAY_KEY_SECRET,
// })

// Controllers
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()

        await User.findByIdAndUpdate(userId, {cartData: {}})

        res.json({success: true, message: "Order placed successfully"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// const placeOrderStripe = async (req, res) => {
//     try {
//         const { userId, items, amount, address } = req.body;

//         const { origin } = req.headers;

//         const orderData = {
//             userId,
//             items,
//             address,
//             amount,
//             paymentMethod: "Stripe",
//             payment: false,
//             date: Date.now()
//         }

//         const newOrder = new Order(orderData)
//         await newOrder.save()

//         const line_items = items.map((item) => ({
//             price_data: {
//                 currency: currency,
//                 product_data: {
//                     name: item.name
//                 },
//                 unit_amount: item.price * 100
//             },
//             quantity: item.quantity
//         }))

//         line_items.push({
//             price_data: {
//                 currency: currency,
//                 product_data: {
//                     name: 'Delivery Charges'
//                 },
//                 unit_amount: deliveryCharge * 100
//             },
//             quantity: 1
//         })

//         const session = await stripe.checkout.sessions.create({
//             success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
//             line_items,
//             mode: 'payment',
//         })

//         res.json({success: true, session_url:session.url, message: "Stripe successfully"})
//     } catch (error) {
//         console.log(error)
//         res.json({success: false, message: error.message})
//     }
// }

// const verifyStripe = async (req, res) => {
//     const { orderId, success, userId } = req.body
//     try {
//         if(success === 'true') {
//             await Order.findByIdAndUpdate(orderId, {payment: true});
//             await Order.findByIdAndUpdate(userId, {cartData: {}});
//             res.json({success: true})
//         } else {
//             await Order.findByIdAndDelete(orderId)
//             res.json({success: false})
//         }

//     } catch (error) {
//         console.log(error)
//         res.json({success: false, message: error.message})
//     }
// }

// const placeOrderRazorpay = async (req, res) => {
//     try {
//         const { userId, items, amount, address } = req.body;

//         const orderData = {
//             userId,
//             items,
//             address,
//             amount,
//             paymentMethod: "COD",
//             payment: false,
//             date: Date.now()
//         }

//         const newOrder = new Order(orderData)
//         await newOrder.save()

//         const options = {
//             amount: amount * 100,
//             currency: currency.toUpperCase(),
//             receipt: newOrder._id.toString()
//         }

//         await razorpayInstance.orders.create(options, (error, order) => {
//             if(error) {
//                 console.log(error)
//                 return res.json({success: false, message: error})
//             }
//             res.json({success: true, order})
//         })

//         res.json({success: true, message: "Razorpay successfully"})
//     } catch (error) {
//         console.log(error)
//         res.json({success: false, message: error.message})
//     }
// }

// const verifyRazorpay = async (req, res) => {
//     try {
//         const { userId, razorpay_order_id } = req.body

//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
//         if(orderInfo.status === 'paid') {
//             await Order.findByIdAndUpdate(orderInfo.receipt, {payment: true});
//             await User.findByIdAndUpdate(userId, {cartData: {}})
//             res.json({success: true, message: "Payment successfull"})
//         } else {
//             res.json({success: false, message: 'Payment Failed'})
//         }
//     } catch (error) {
//         console.log(error)
//         res.json({success: false, message: error.message})
//     }
// }

const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({})

        res.json({success: true, orders, message: "All orders fetched successfully"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body

        const orders = await Order.find({ userId })
        res.json({success: true, orders, message: "My orders fetched successfully"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const updateStatus = async (req, res) => {
    try {
        const { orderId, status} = req.body
        await Order.findByIdAndUpdate(orderId, {status})
        
        res.json({success: true, message: "Status updated successfully"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
} 

export { placeOrder, allOrders, userOrders, updateStatus }