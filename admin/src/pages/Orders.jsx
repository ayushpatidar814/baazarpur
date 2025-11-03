import { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App.jsx'
import { toast } from 'react-toastify'

const Orders = ({token}) => {

  const[orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if(!token){
      return null
    }

    try {
      const response = await axios.post(backendUrl + '/order/list', {}, {headers:{token}})
      if(response.data.success){
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/order/status', {orderId, status:event.target.value}, {headers:{token}})
      if(response.data.success){
        await fetchAllOrders()
      } 
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div>
      <div className='inline-flex gap-2 items-center mb-3'>
      <p className="text-gray-500">ORDER <span className='text-gray-700 font-medium'>PAGE</span></p>
      <p className="w-8 sm:w-12 h-[2px] bg-gray-700"></p>
    </div>
      <div>
        {
          orders.map((order, key) => (
            <div key={key} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-3 md:p-5 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
              <img className='w-full h-auto mt-2 rounded-3xl' src={order.items[0].image} alt="icon" />
              <div>
                <div>
                {
                  order.items.map((item, key) => {
                    if(key === order.items.length - 1){
                      return <p className='py-0.5' key={key}> {item.name} x {item.quantity} <span>{item.size}</span></p>
                    } else {
                      return <p className='py-0.5' key={key}> {item.name} x {item.quantity} <span>{item.size}</span>,</p>
                    }
                  })
                }
              </div>
              <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ", " + order.address.city + ","}</p>
                <p>{order.address.state + ", " + order.address.country + ", " + order.address.pincode}</p>
              </div> 
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                <p className='mt-3'>Method : <span className={`${order.paymentMethod === "COD" ? "" : "text-green-500"}`}>{order.paymentMethod}</span></p>
                <p>Payment : <span className={`${order.payment ? "text-green-500" : ""}`}>{order.payment ? 'Done' : 'Pending'}</span></p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
              <select onChange={(event) => statusHandler(event, order._id)}  value={order.status} className='p-2 font-semibold bg-white'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
