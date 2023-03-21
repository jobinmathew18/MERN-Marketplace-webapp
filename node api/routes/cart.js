const router = require('express').Router();
const Cart = require('../models/Cart');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

//CREATE AND ADD TO CART
router.put('/', verifyToken, async (req, res) => {
    const userId = req.user.id
    // console.log(userId)

    try {
        let cart = await Cart.findOne({ userId })

        if (cart) {
            await Cart.updateOne({userId:userId}, { $push: { products: req.body } })
            res.status(200).send("added to cart")
        } else {
            const newCart = new Cart({userId: userId, products: req.body});
            try {
                await newCart.save();
                res.status(200).send("created a cart and then added")
            } catch (error) {
                res.status(500).json(error)
            } 
        }

    } catch (error) {
        res.status(500).json(error)
    }
})


//UPDATE
router.put('/update/:id', verifyToken, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE
router.put('/delete/:id', verifyToken, async (req, res) => {
    const userId = req.user.id
    try {
        const cart = await Cart.updateOne({ userId }, {$pull: {products: {productId: req.params.id}}})
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET USER's CART           //note: every user will obviously have only single cart. That is why, in req.params we are passing user's id and not cart's id.
router.get('/find/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.id });
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET CARTS OF ALL USERS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router 