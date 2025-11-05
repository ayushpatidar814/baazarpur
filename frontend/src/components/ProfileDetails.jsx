import axios from 'axios';
import { useContext } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext.jsx';

const ProfileDetails = ({ setEditMode, profile, setProfile, text1, text2 }) => {
    
  const { backendUrl, token } = useContext(ShopContext)

  const fetchProfile = async () => {
    try {
      const response = await axios.post(backendUrl + '/profile/getData', {}, {headers: {token}})
      if(response.data.success) {
        setProfile(response.data.profile)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(token) {
    fetchProfile()
    }
  }, [token])

  return (
     <div className="flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl shadow-xl shadow-gray w-full max-w-3xl p-10">
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
              <span className="text-gray-500 text-sm">First Name</span>
              <span className="text-gray-900 font-medium text-lg">{profile ? profile.firstName : ''}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Last Name</span>
              <span className="text-gray-900 font-medium text-lg">{profile ? profile.lastName : ''}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Phone</span>
              <span className="text-gray-900 font-medium text-lg">{profile ? profile.phone : ''}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Email</span>
              <span className="text-gray-900 font-medium text-lg">{profile ? profile.email : ''}</span>
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
              <span className="text-gray-500 text-sm">Street</span>
              <span className="text-gray-900 font-medium text-lg">{profile ? profile.street : ''}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">City</span>
              <span className="text-gray-900 font-medium text-lg">{profile ? profile.city : ''}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">State</span>
              <span className="text-gray-900 font-medium text-lg">{profile ? profile.state : ''}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Country</span>
              <span className="text-gray-900 font-medium text-lg">{profile ? profile.country : ''}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Pincode</span>
              <span className="text-gray-900 font-medium text-lg">{profile ? profile.pincode : ''}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button onClick={() => setEditMode(true)} className="px-6 py-2.5 rounded-full bg-gray-900 text-white font-medium shadow hover:bg-gray-800 transition-all duration-200">
          {text2}
        </button>
      </div>
    </div>
  </div>
  )
}

export default ProfileDetails
