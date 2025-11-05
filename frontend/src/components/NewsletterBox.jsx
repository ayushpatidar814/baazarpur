import { useContext } from 'react';
import { useState } from 'react';
import {toast} from 'react-toastify';
import { ShopContext } from '../context/ShopContext.jsx'
import axios from 'axios';

const NewsletterBox = () => {

    const[email, setEmail] = useState('')
    const { backendUrl, token } = useContext(ShopContext)

    const handleSubmit = async () => {
        try {
          const response = await axios.post(backendUrl + '/subscription/subscribe', {email}, {headers: {token}})
          if(response.data.success) {
            toast.success("SUBSCRIBED")
            setEmail('')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
    } 
  
  return (
    <div className='text-center'>
         <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</p>
        <p className="text-gray-400 mt-3">Stay connected with Baazarpur for the latest trends, exclusive deals, and special offers! 💌</p>
          <p className='pt-2 text-gray-400'>Subscribe to our newsletter and be the first to know about new arrivals, seasonal sales, and style inspiration — straight to your inbox.</p>
          <p className='text-gray-400'>Join our growing community of happy shoppers and never miss an update!</p>
        <form onSubmit={handleSubmit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none' required />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox
