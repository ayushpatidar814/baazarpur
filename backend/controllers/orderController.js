import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import Stripe from 'stripe'
import Razorpay from 'razorpay'
import dotenv from 'dotenv'
// import Instamojo from 'instamojo-nodejs'

dotenv.config();

// Global variables
const currency = 'inr'
const deliveryCharge = 40;

// Gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new Razorpay({
    key_id : "rzp_test_RbK7fgKYe0JtXD",
    key_secret : "6nLjd4Zu64wE0BlVhEcGhJgq",
}) 
// Instamojo.setKeys(process.env.INSTAMOJO_API_KEY, process.env.INSTAMOJO_AUTH_TOKEN);
// Instamojo.isSandboxMode(false);

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

const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({success: true, session_url:session.url, message: "Stripe successfully"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body
    try {
        if(success === 'true') {
            await Order.findByIdAndUpdate(orderId, {payment: true});
            await Order.findByIdAndUpdate(userId, {cartData: {}});
            res.json({success: true})
        } else {
            await Order.findByIdAndDelete(orderId)
            res.json({success: false})
        }

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if(error) {
                console.log(error)
                return res.json({success: false, message: error})
            }
            res.json({success: true, order})
        })

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid') {
            await Order.findByIdAndUpdate(orderInfo.receipt, {payment: true});
            await User.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success: true, message: "Payment successfull"})
        } else {
            res.json({success: false, message: 'Payment Failed'})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// const placeOrderInstamojo = async (req, res) => {
//     try {
//         console.log("Request received")
//         const { userId, items, amount, address } = req.body;

//         const orderData = {
//             userId,
//             items,
//             address,
//             amount,
//             paymentMethod: "Instamojo",
//             payment: false,
//             date: Date.now()
//         }

//         const newOrder = new Order(orderData)
//         await newOrder.save()

//         const data = new Instamojo.PaymentData();
//         data.purpose = "Baazarpur- Ecom Purchase";
//         data.amount = amount;
//         data.buyer_name = `${address.firstName} ${address.lastName}`
//         data.email = address.email;
//         data.phone = address.phone;
//         data.redirect_url = "https://baazarpur-five.vercel.app/orders";
//         data.allow_repeated_payments = false;
        
//         Instamojo.createPayment(data, (error, response) => {
//             if(error) {
//                 console.log(error)
//                 return res.json({success: false, message: "Payment request failed"})
//             } else {
//                 const responseData = JSON.parse(response)
//                 console.log(responseData)
//                 // return res.json({success: true, payment_url: responseData.payment_request.longurl,})
//             }
//         })
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

export { placeOrder, placeOrderStripe, verifyStripe, placeOrderRazorpay, verifyRazorpay, allOrders, userOrders, updateStatus }