const router = require('express').Router();
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

//REGISTER
router.post('/register', async (req,res)=>{
    const{username, email, password} = req.body
    const newUser = new User({username, email, 
        password: CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET).toString()})
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)  
    } catch (error) {
        res.status(500).json(error)
    }
})

 
//LOGIN
router.post('/login', async (req,res)=>{
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user) return res.status(404).json("invalid credentials")
        const hashedPassoword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET)        //decrypting hashed password
        const originalPassword = hashedPassoword.toString(CryptoJS.enc.Utf8)
        if(originalPassword !== req.body.password) return res.status(400).json("Wrong Credentials")             //matching passwords

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },    
        process.env.JWT_SECRET, 
        {expiresIn: "3d"}
        )

        // const {password, ...others} = user 
        const {password, ...others} = user._doc             //mongodb stores our object inside _doc    
        res.status(200).json({...others, accessToken})
    } catch (error) {   
        res.status(500).json(error)  
    }
})


module.exports = router