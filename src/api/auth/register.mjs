import User from '../../models/user.mjs'
import bcrypt from 'bcrypt'



const userRegister = async(req, res) => {
    const { name, email, password } = req.body

    // Check if all the fields are completed

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists

    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash paswword 

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user

    const user = await User.create({
        name, 
        email,
        password: hashedPassword
    })

    if(user) {
        req.flash('success_msg','You have now registered!')
        res.redirect('/users/login')
    } else {
        res.status(400)
        throw new Error('INVALID USER DATA ')
    }
    
}




export default userRegister