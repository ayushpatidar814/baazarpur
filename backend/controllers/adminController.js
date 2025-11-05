import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";

const getOverview = async (req, res) => {
    
    try {
        const totalSalesData = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const overview = {
            totalSales: totalSalesData[0]?.total || 0,
            totalOrders: await Order.countDocuments(),
            totalUsers: await User.countDocuments(),
            totalProducts: await Product.countDocuments(),
        };

        res.json({success: true, overview, message: "Overview successfull"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const getSalesTrends = async (req, res) => {
    try {
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);

        const data = await Order.aggregate([
            { $match: { date: { $gte: last30Days.getTime() } } },
            {
                $group: {
                _id: {
                    $dateToString: {
                    format: "%Y-%m-%d",
                    date: { $toDate: "$date" }
                    }
                },
                totalSales: { $sum: "$amount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const formatted = data.map(d => ({
            date: d._id,
            sales: d.totalSales
        }));
            
        res.json({success: true, trends: formatted, message: "Fetched sales trends successfully"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const getOrdersByStatus = async (req, res) => {
    try {
        const data = await Order.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        const formatted = {};
        data.forEach(item => {
            formatted[item._id] = item.count;
        });
        
        res.json({success: true, statusData: formatted, message: "Fetched orders by status successfully"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const getTopProducts = async (req, res) => {
    try {
        const data = await Order.aggregate([
            { $unwind: "$items" },
            { $group: { _id: "$items._id", name: { $first: "$items.name" }, count: { $sum: "$items.quantity" }, totalRevenue: { $sum: "$items.amount" } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
         ]);

        
        res.json({success: true, topProducts: data, message: "Top products fetched successfully"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const getSubscribersTrends = async (req, res) => {
    try {
        const last6Months = new Date();
        last6Months.setMonth(last6Months.getMonth() - 6);

        const data = await Subscription.aggregate([
            { $match: { createdAt: { $gte: last6Months } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const formatted = data.map(d => ({
            month: d._id,
            count: d.count
        }));
            
        res.json({success: true, subscribers: formatted, message: "Fetched Subscriber trends"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { getOverview, getSalesTrends, getOrdersByStatus, getTopProducts, getSubscribersTrends }