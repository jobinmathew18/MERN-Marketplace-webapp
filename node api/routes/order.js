const router = require('express').Router();
const Order = require('../models/Order');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

//CREATE
router.post('/', verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
})

//UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.status(200).json(updatedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
})

//DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json("Order has been deleted.")
  } catch (error) {
    res.status(500).json(error)
  }
})

//GET USER'S ORDERS
router.get('/find/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
})

//GET ALL ORDERS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
})

//GET MONTHLY INCOME
//get income of this month and previous month
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;                  //http://localhost:5000/api/orders/income?pid=64064e8687a6548fa1554336
  const date = new Date();                                                                    //if current month is march
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));                             //then lastMonth is february
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));              //and previous month is january

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {                                          //sale of a particular product from past two month
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router 