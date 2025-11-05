import { Profile } from "../models/profile.model.js";

const profileData = async (req, res) => {
    try {
        const { userId, address, personalDetails } = req.body;

        if (!userId) {
            return res.json({ success: false, message: "Please login" });
        }

        const profileData = {
            userId,
            firstName: personalDetails.firstName,
            lastName: personalDetails.lastName,
            phone: personalDetails.phone,
            email: personalDetails.email,
            street: address.street,
            city: address.city,
            state: address.state,
            country: address.country,
            pincode: address.pincode
        }

        await Profile.findOneAndUpdate({ userId }, profileData, { new: true, upsert: true });

        res.json({success: true, message: "Profile data saved successfully"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const getProfileData = async (req, res) => {
    try {
        const { userId } = req.body;

        const profile = await Profile.findOne({userId})

        if(!profile) {
          return res.json({ success: false, message: "Profile not found" });
         }

        res.json({success: true, profile, message: "Profile data fetched successfully"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { profileData, getProfileData }