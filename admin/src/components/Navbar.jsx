import { assets } from '../assets/assets.js'

const Navbar = ({setToken}) => {
  return (
    <div className='flex justify-between items-center px-[4%] py-2'>
        <img src={assets.logo} alt="logo" className='w-[max(10%,80px)] rounded-full' />
        <button onClick={() => setToken('')} className='bg-gray-600 h-12 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xl sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
