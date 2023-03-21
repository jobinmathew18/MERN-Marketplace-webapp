const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

router.post("/payment", async (req, res) => {
    console.log(req.body) 
    await stripe.paymentIntents.create(                         //refer to : https://stripe.com/docs/payments/payment-intents
        {
            currency: 'usd',
            // source: req.body.source,
            amount: req.body.amount, 
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    );


});

module.exports = router;