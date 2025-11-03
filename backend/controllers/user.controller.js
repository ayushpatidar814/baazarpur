import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exist
        const userExist = await User.findOne({email}) 
        if(!userExist) {
            return res.json({success: false, message: "User not found"})
        }

        // check password
        const isMatch = await bcrypt.compare(password, userExist.password)
        if(!isMatch) {
            res.json({success: false, message: "Password is incorrect"})
        }

        // login now
        const token = createToken(userExist._id)
        res.json({success: true, token, message:"User login successfull"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // checking if user already exists
        const userExist = await User.findOne({email});
        if(userExist) { 
            return res.json({success: false, message: "User already exists"})
        }

        // Validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Please provide valid email Id"})
        }
        if(password.length < 8) {
            return res.json({success: false, message: "Please enter a strong password"})
        }

        // hasing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()
        
        const token = createToken(User._id)

        res.json({success: true, token, message:"Registration successfull"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({success: false, message: "Invalid Credentials"})
        }

        res.json({success: true, message:"Admin login successfull"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export {loginUser, registerUser, adminLogin};