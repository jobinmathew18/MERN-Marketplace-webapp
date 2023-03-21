const express = require('express')
const app = express();
require('./dbConn')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const userRoute = require('./routes/users') 
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const stripeRoute = require("./routes/stripe");
   
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/carts', cartRoute)
app.use('/api/orders', orderRoute)
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT, ()=>{
    console.log(`app running on port ${process.env.PORT}`)  
})      