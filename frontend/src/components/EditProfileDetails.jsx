import { useContext } from 'react';
import { useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import axios from 'axios'
import { toast } from 'react-toastify';

const EditProfileDetails = ({ setEditMode, text1 }) => {
    const { backendUrl, token } = useContext(ShopContext)

    const[firstName, setFirstName] = useState('')
  const[lastName, setLastName] = useState('')
  const[phone, setPhone] = useState()
  const[email, setEmail] = useState('')
  const[street, setStreet] = useState('')
  const[city, setCity] = useState('')
  const[state, setState] = useState('')
  const[country, setCountry] = useState('')
  const[pincode, setPincode] = useState()

  const handleSubmit = async () => {

    try {

      let profileData = {
        address: {
          street: street,
          city: city,
          state: state,
          country: country,
          pincode: pincode
        },
        personalDetails: {
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          email: email
        }
      }

      const response = await axios.post(backendUrl + '/profile/addData', profileData, {headers: {token}})
      if(response.data.success) {
        toast.success("Profile Updated")
        setFirstName('')
        setLastName('')
        setPhone()
        setEmail('')
        setStreet('')
        setCity('')
        setState('')
        setCountry('')
        setPincode()
        setEditMode(false)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex items-center justify-center py-12 px-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        {text1}
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Left Side – Personal Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
            Personal Details
          </h3>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">First Name</label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
                type="text"
                placeholder="Enter first name"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">Last Name</label>
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
                type="text"
                placeholder="Enter last name"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">Phone</label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
                type="number"
                placeholder="Enter contact number"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                type="email"
                placeholder="Enter email address"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Side – Address */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
            Address
          </h3>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">Street</label>
              <input
                onChange={(e) => setStreet(e.target.value)}
                value={street}
                required
                type="text"
                placeholder="Enter street"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">City</label>
              <input
                onChange={(e) => setCity(e.target.value)}
                value={city}
                required
                type="text"
                placeholder="Enter city"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">State</label>
              <input
                onChange={(e) => setState(e.target.value)}
                value={state}
                required
                type="text"
                placeholder="Enter state"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">Country</label>
              <input
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                required
                type="text"
                placeholder="Enter country"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">Pincode</label>
              <input
                onChange={(e) => setPincode(e.target.value)}
                value={pincode}
                required
                type="number"
                placeholder="Enter pincode"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10 gap-4">
        <button type='submit' className="px-6 py-2.5 rounded-full bg-gray-900 text-white font-medium shadow hover:bg-gray-800 transition-all duration-200">
          Save Changes
        </button>
        <button onClick={() => setEditMode(false)} className="px-6 py-2.5 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-all duration-200">
          Cancel
        </button>
      </div>
    </div>
  </form>

  )
}

export default EditProfileDetails
