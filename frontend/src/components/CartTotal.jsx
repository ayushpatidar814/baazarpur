import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const CartTotal = () => {

    const[discount, setDiscount] = useState(0);

    const { currency, delivery_fee, getCartAmount, backendUrl, token } = useContext(ShopContext)
    
    const checkSubscription = async () => {
      try {
        const response = await axios.post(backendUrl + '/subscription/check', {}, {headers:{token}})
        if(response.data.success) {
          setDiscount(getCartAmount() * 20 / 100)
        } else {
          setDiscount(0)
        }

      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

    useEffect(() => {
      if(token) {
        checkSubscription()
      }
    }, [token])

  return (
    <div className='w-full'>
      <div className="text-2xl">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{currency}{getCartAmount().toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>{currency}{delivery_fee.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
            <p>Subscription Discount</p>
            <p>{currency}{discount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
            <p>Total</p>
            <p>{currency}{getCartAmount() === 0 ? 0 : Math.floor(getCartAmount() - discount + delivery_fee)}</p>
        </div>
      </div>
    </div> )
}

export default CartTotal
