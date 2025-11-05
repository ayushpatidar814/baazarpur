import ProfileDetails from '../components/ProfileDetails.jsx';
import EditProfileDetails from '../components/EditProfileDetails.jsx';
import { useState } from 'react';

const MyProfile = () => {
  
  const[editMode, setEditMode] = useState(false);
  const[profile, setProfile] = useState()
  
  return editMode ? (
    <EditProfileDetails setEditMode={setEditMode} text1={'Update Profile'}/>
  ) : (
    <ProfileDetails setEditMode={setEditMode} profile={profile} setProfile={setProfile} text1={'My Profile'} text2={'Edit Profile'} />
  )
}

export default MyProfile
