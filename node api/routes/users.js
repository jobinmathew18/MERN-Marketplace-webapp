const router = require('express').Router();
const User = require('../models/User');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken')

//UPDATE
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })       //{new:true} will return the updated value 
        res.status(200).json(updatedUser)
    } catch (error) {
        rew.status(500).json(error)
    }
})

//DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    } catch (error) {
        req.status(500).json(error)
    }
})


//GET USER
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc             //mongodb stores our object inside _doc  
        res.status(200).json({ ...others})
    } catch (error) {
        req.status(500).json(error)
    }
})


//GET CURRENT USER
router.get('/currentuser', verifyToken, async(req,res)=>{
    // console.log(req.user)
    try {
        const currentUser = await User.findById(req.user.id)
        res.status(200).json(currentUser)
    } catch (error) {
        next(error)
    }
})

//GET ALL USERS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new                 //http://localhost:5000/api/users?new=true
    try {
        const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find()
        res.status(200).json(users)
    } catch (error) {
        req.status(500).json(error)
    }
})

//GET USER STATS
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))       //getting previous year of today
    
    try {
        const data = await User.aggregate([
          { $match: { createdAt: { $gte: lastYear } } },
          {
            $project: {
              month: { $month: "$createdAt" }, 
            },
          },
          {
            $group: {
              _id: "$month",
              total: { $sum: 1 },
            },
          },
        ]).sort({_id: 1});
        res.status(200).json(data)
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = router