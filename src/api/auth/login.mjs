import User from '../../models/user.mjs'
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
const { sign } = jwt

const userLogin = async (req, res) => {
    
    const {email, password} = req.body 

    // Check for user email
    const user = await User.findOne({email})
    
    if(user && (await bcrypt.compare(password, user.password) )) {
        req.flash('success_msg','You are now logged in!')
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        algorithm: "HS512",
        expiresIn: "1h",
    });
    
    console.log(token)
    // Store the token in a cookie you can split it and store in multiple for more security
    return res
        .cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .redirect('/users/dashboard')
    req.flash('success_msg','You are now logged in !')
};

export default userLogin

