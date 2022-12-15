import express from 'express'
import User from '../models/user.mjs'
import userLogin from '../api/auth/login.mjs'
import userRegister from "../api/auth/register.mjs"
import auth from '../api/middleware/auth.mjs'
import cookieParser from 'cookie-parser'

const router = express.Router();

//login handle
router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/register',(req,res)=>{
    res.render('register')
})

router.use(cookieParser())

router.get('/dashboard', auth, (req,res)=>{
    res.render('dashboard')
})

//Register handle
router.post('/register', userRegister)
router.post('/login', userLogin)




//logout
router.get('/logout',(req,res)=>{
})


export {router}